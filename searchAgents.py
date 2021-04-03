"""
This file contains incomplete versions of some agents that can be selected to control Pacman.
You will complete their implementations.

Good luck and happy searching!
"""

import logging

from pacai.core.actions import Actions
# from pacai.core.search import heuristic
from pacai.core.search.position import PositionSearchProblem
from pacai.core.search.problem import SearchProblem
from pacai.agents.base import BaseAgent
from pacai.agents.search.base import SearchAgent

from pacai.core.directions import Directions
from pacai.core import distance
from pacai.student import search
# from pacai.core.distanceCalculator import Distancer


class CornersProblem(SearchProblem):
    """
    This search problem finds paths through all four corners of a layout.

    You must select a suitable state space and successor function.
    See the `pacai.core.search.position.PositionSearchProblem` class for an example of
    a working SearchProblem.

    Additional methods to implement:

    `pacai.core.search.problem.SearchProblem.startingState`:
    Returns the start state (in your search space,
    NOT a `pacai.core.gamestate.AbstractGameState`).

    `pacai.core.search.problem.SearchProblem.isGoal`:
    Returns whether this search state is a goal state of the problem.

    `pacai.core.search.problem.SearchProblem.successorStates`:
    Returns successor states, the actions they require, and a cost of 1.
    The following code snippet may prove useful:
    ```
        successors = []

        for action in Directions.CARDINAL:
            x, y = currentPosition
            dx, dy = Actions.directionToVector(action)
            nextx, nexty = int(x + dx), int(y + dy)
            hitsWall = self.walls[nextx][nexty]

            if (not hitsWall):
                # Construct the successor.

        return successors
    ```
    """

    def __init__(self, startingGameState):
        super().__init__()

        self.walls = startingGameState.getWalls()
        self.startingPosition = startingGameState.getPacmanPosition()
        top = self.walls.getHeight() - 2
        right = self.walls.getWidth() - 2

        self.corners = ((1, 1), (1, top), (right, 1), (right, top))
        for corner in self.corners:
            if not startingGameState.hasFood(*corner):
                logging.warning('Warning: no food in corner ' + str(corner))

        # *** Your Code Here ***

    # Returns the start state ( in your search space,
    # NOT a `pacai.core.gamestate.AbstractGameState`).
    def startingState(self):
        # print("Starting state: %s" % (str(self.startingPosition)))
        # print("Corners: %s" % (str(self.corners)))
        # returning the start state and a list to add the corners once they're visited
        return (self.startingPosition, [])

    # Returns whether this search state is a goal state of the problem.
    def isGoal(self, state):
        # print("First position in state: %s" % (str(state[0])))
        # print("Second position in state: %s" % (str(state[1])))
        currState = state[0]
        visitedList = state[1]
        # If all of the corners have been visited, then its a goal state
        if currState in self.corners:
            if currState not in visitedList:
                visitedList.append(currState)
            # print("Visited list: %s" % (str(visitedList)))
            if len(visitedList) == len(self.corners):
                # print("T First position in state: %s" % (str(currState)))
                # print("T Second position in state: %s" % (str(visitedList)))
                return True
        # print("F First position in state: %s" % (str(currState)))
        # print("F Second position in state: %s" % (str(visitedList)))
        return False

    # Returns successor states, the actions they require, and a cost of 1.
    # The following code snippet may prove useful:
    # ```
    #   successors = []

    #    for action in Directions.CARDINAL:
    #         x, y = currentPosition
    #         dx, dy = Actions.directionToVector(action)
    #         nextx, nexty = int(x + dx), int(y + dy)
    #         hitsWall = self.walls[nextx][nexty]

    #         if (not hitsWall):
    #             # Construct the successor.

    #     return successors
    # ```
    def successorStates(self, state):
        successors = []

        for action in Directions.CARDINAL:
            x, y = state[0]
            visitedCorners = state[1]
            dx, dy = Actions.directionToVector(action)
            nextx, nexty = int(x + dx), int(y + dy)
            hitsWall = self.walls[nextx][nexty]
            # print("x in state[0]: %s" % (str(x)))
            # print("y in state[0]: %s" % (str(y)))
            # print("dx: %s" % (str(dx)))
            # print("dy: %s" % (str(dy)))
            # print("nextx: %s" % (str(nextx)))
            # print("nexty: %s" % (str(nexty)))
            # print("hitsWall: %s" % (str(hitsWall)))

            # Construct the successor
            if not hitsWall:
                # successor node
                nextState = (nextx, nexty)
                # print("nextState: %s" % (str(nextState)))
                # Copying the visitedCorners into another list variable to visit
                # more corners if not all have been visited yet.
                # Referenced stack overflow
                # https://stackoverflow.com/questions/2612802/list-changes-unexpectedly
                # -after-assignment-how-do-i-clone-or-copy-it-to-prevent
                vc = visitedCorners.copy()
                # print("vc before: %s" % (str(vc)))
                # if the successor state is a corner
                if(nextState in self.corners):
                    if(nextState not in vc):
                        # if successor is corner and not visited, add to visited corners list
                        vc.append(nextState)
                        # print("vc adding more: %s" % (str(vc)))
                # appending the sucessor
                successors.append(((nextState, vc), action, 1))
                # print("successors: %s" % (str(successors)))

        return successors

    # raise NotImplementedError()

    def actionsCost(self, actions):
        """
        Returns the cost of a particular sequence of actions.
        If those actions include an illegal move, return 999999.
        This is implemented for you.
        """

        if (actions is None):
            return 999999

        x, y = self.startingPosition
        for action in actions:
            dx, dy = Actions.directionToVector(action)
            x, y = int(x + dx), int(y + dy)
            if self.walls[x][y]:
                return 999999

        return len(actions)

def cornersHeuristic(state, problem):
    """
    A heuristic for the CornersProblem that you defined.

    This function should always return a number that is a lower bound
    on the shortest path from the state to a goal of the problem;
    i.e. it should be admissible.
    (You need not worry about consistency for this heuristic to receive full credit.)
    """

    # Useful information.
    # corners = problem.corners  # These are the corner coordinates
    # walls = problem.walls  # These are the walls of the maze, as a Grid.

    # *** Your Code Here ***
    corners = problem.corners
    # walls = problem.walls
    position = state[0]
    visitedCorners = state[1]
    unVC = []

    # print("vc corners: %s" % (str(state[1])))
    # print("corners: %s" % (str(corners)))
    # print("position: %s" % (str(state[0])))

    # print("visited corners: %s" % (str(visitedCorners)))
    index = 0
    cHeuristic = 0
    pos = position

    # If all of the corners have been visited, then its a goal state
    # for corner in corners:
    if position in corners:
        if position not in visitedCorners:
            visitedCorners.append(position)

    while index < 4:
        if corners[index] not in visitedCorners:
            unVC.append(corners[index])
        index = index + 1

    # print("visitedCorners: %s" % (str(visitedCorners)))

    # Need to walk through the unvisited corners only
    while(len(unVC) > 0):
        # print("unVC: %s" % (str(unVC)))
        # List of the distance from current state to corners and each corner visited
        dist = []
        for corner in unVC:
            # Finding the Manhattan distance between the position we're at and the corner
            # Using Manhattan dist like we are walking around the border walls of the map
            # from corner to corner visiting only the unvisited ones.
            dist.append((distance.manhattan(pos, corner), corner))
        # print("dist: %s" % (str(dist)))
        # Getting the smallest distance from the dist list
        minDist = min(dist)
        # print("corner: %s" % (str(minDist[1])))
        # Updating the heuristic value to eventually be the lowest cost path distance
        cHeuristic = cHeuristic + minDist[0]
        pos = minDist[1]
        unVC.remove(minDist[1])

    return cHeuristic

    # while(len(unvisitedCorners) != 0):
    # if corners[index] not in visitedCorners:
    #     # List of the distance from current state to corners and each corner visited
    #     dist = []
    #     for corner in unvisitedCorners:
    #         # Finding the Manhattan distance between the position we're at and the corner
    #         # Using Manhattan dist like we are walking around the border walls of the map
    #         # from corner to corner visiting only the unvisited ones.
    #         dist.append((distance.manhattan(pos, corner), corner))
    #     # Getting the smallest distance from the dist list
    #     minDistance = min(dist)
    #     # updating the heuristic value to eventually be the lowest cost path distance
    #     heuristic = heuristic + minDistance[0]
    #     # Replacing the current position with the unvisited corner we're closest to
    #     # and going thru the while loop again until all unvisited nodes are visited
    #     pos = minDistance[1]
    #     # Removing the corner just visited from the unvisited list
    #     unvisitedCorners.remove(minDistance[1])

    # return heuristic.null(state, problem)  # Default to trivial solution

def foodHeuristic(state, problem):
    """
    Your heuristic for the FoodSearchProblem goes here.

    This heuristic must be consistent to ensure correctness.
    First, try to come up with an admissible heuristic;
    almost all admissible heuristics will be consistent as well.

    If using A* ever finds a solution that is worse than what uniform cost search finds,
    your heuristic is *not* consistent, and probably not admissible!
    On the other hand, inadmissible or inconsistent heuristics may find optimal solutions,
    so be careful.

    The state is a tuple (pacmanPosition, foodGrid) where foodGrid is a
    `pacai.core.grid.Grid` of either True or False.
    You can call `foodGrid.asList()` to get a list of food coordinates instead.

    If you want access to info like walls, capsules, etc., you can query the problem.
    For example, `problem.walls` gives you a Grid of where the walls are.

    If you want to *store* information to be reused in other calls to the heuristic,
    there is a dictionary called problem.heuristicInfo that you can use.
    For example, if you only want to count the walls once and store that value, try:
    ```
    problem.heuristicInfo['wallCount'] = problem.walls.count()
    ```
    Subsequent calls to this heuristic can access problem.heuristicInfo['wallCount'].
    """

    # Given
    position, foodGrid = state

    # print("position: %s" % (str(position)))
    # print("foodGrid: %s" % (str(foodGrid.asList())))

    # *** Your Code Here ***
    foodList = foodGrid.asList()
    dist = []
    # heuristic = 0

    if len(foodList) == 0:
        return 0

    for food in foodList:
        # print("position: %s" % (str(position)))
        # print("food: %s" % (str(food)))
        # Adding the distances between start position and all the food to a list
        dist.append(distance.manhattan(position, food))

        # heuristic = max(heuristic, distance.maze(position, food, problem.startingGameState))

    return max(dist)

    # print("dist: %s" % (str(dist)))
    # Getting the heuristic for the largest manhattan distance bc that was the last
    # food to be visited which means we've reached our goal state
    # heuristicVal = max(dist)
    # return heuristic

    # return heuristic.null(state, problem)  # Default to the null heuristic.

class ClosestDotSearchAgent(SearchAgent):
    """
    Search for all food using a sequence of searches.
    """

    def __init__(self, index, **kwargs):
        super().__init__(index)

    def registerInitialState(self, state):
        self._actions = []
        self._actionIndex = 0

        currentState = state

        while (currentState.getFood().count() > 0):
            nextPathSegment = self.findPathToClosestDot(currentState)  # The missing piece
            self._actions += nextPathSegment

            for action in nextPathSegment:
                legal = currentState.getLegalActions()
                if action not in legal:
                    raise Exception('findPathToClosestDot returned an illegal move: %s!\n%s' %
                            (str(action), str(currentState)))

                currentState = currentState.generateSuccessor(0, action)

        logging.info('Path found with cost %d.' % len(self._actions))

    def findPathToClosestDot(self, gameState):
        """
        Returns a path (a list of actions) to the closest dot, starting from gameState.
        """

        # Here are some useful elements of the startState
        # startPosition = gameState.getPacmanPosition()
        # food = gameState.getFood()
        # walls = gameState.getWalls()
        # problem = AnyFoodSearchProblem(gameState)

        # *** Your Code Here ***

        # startPosition = gameState.getPacmanPosition()
        # food = gameState.getFood()
        # walls = gameState.getWalls()
        problem = AnyFoodSearchProblem(gameState)

        # the search problems (any) could work bc they return a path, but I
        # chose bfs because it is easier to implement here than astar or ucs
        # and is better than dfs
        return search.breadthFirstSearch(problem)
        # raise NotImplementedError()

class AnyFoodSearchProblem(PositionSearchProblem):
    """
    A search problem for finding a path to any food.

    This search problem is just like the PositionSearchProblem,
    but has a different goal test, which you need to fill in below.
    The state space and successor function do not need to be changed.

    The class definition above, `AnyFoodSearchProblem(PositionSearchProblem)`,
    inherits the methods of `pacai.core.search.position.PositionSearchProblem`.

    You can use this search problem to help you fill in
    the `ClosestDotSearchAgent.findPathToClosestDot` method.

    Additional methods to implement:

    `pacai.core.search.position.PositionSearchProblem.isGoal`:
    The state is Pacman's position.
    Fill this in with a goal test that will complete the problem definition.
    """

    def __init__(self, gameState, start = None):
        super().__init__(gameState, goal = None, start = start)

        # Store the food for later reference.
        self.food = gameState.getFood()

    def isGoal(self, state):
        # Returns a Grid of boolean food indicator variables and returns
        # the values as a list.
        allFood = self.food.asList()
        if state in allFood:
            return True
        return False

class ApproximateSearchAgent(BaseAgent):
    """
    Implement your contest entry here.

    Additional methods to implement:

    `pacai.agents.base.BaseAgent.getAction`:
    Get a `pacai.bin.pacman.PacmanGameState`
    and return a `pacai.core.directions.Directions`.

    `pacai.agents.base.BaseAgent.registerInitialState`:
    This method is called before any moves are made.
    """

    def __init__(self, index, **kwargs):
        super().__init__(index)
