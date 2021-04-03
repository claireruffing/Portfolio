import random

from pacai.agents.base import BaseAgent
from pacai.agents.search.multiagent import MultiAgentSearchAgent

from pacai.core import distance
from pacai.core.directions import Directions

# PA2: Multi-Agent Pac-man

class ReflexAgent(BaseAgent):
    """
    A reflex agent chooses an action at each choice point by examining
    its alternatives via a state evaluation function.

    The code below is provided as a guide.
    You are welcome to change it in any way you see fit,
    so long as you don't touch the method headers.
    """

    def __init__(self, index, **kwargs):
        super().__init__(index)

    def getAction(self, gameState):
        """
        You do not need to change this method, but you're welcome to.

        `ReflexAgent.getAction` chooses among the best options according to the evaluation function.

        Just like in the previous project, this method takes a
        `pacai.core.gamestate.AbstractGameState` and returns some value from
        `pacai.core.directions.Directions`.
        """

        # Collect legal moves.
        legalMoves = gameState.getLegalActions()

        # Choose one of the best actions.
        scores = [self.evaluationFunction(gameState, action) for action in legalMoves]
        bestScore = max(scores)
        bestIndices = [index for index in range(len(scores)) if scores[index] == bestScore]
        chosenIndex = random.choice(bestIndices)  # Pick randomly among the best.

        return legalMoves[chosenIndex]

    def evaluationFunction(self, currentGameState, action):
        """
        Design a better evaluation function here.

        The evaluation function takes in the current `pacai.bin.pacman.PacmanGameState`
        and an action, and returns a number, where higher numbers are better.
        Make sure to understand the range of different values before you combine them
        in your evaluation function.
        """

        # successorGameState = currentGameState.generatePacmanSuccessor(action)

        # Useful information you can extract.
        # newPosition = successorGameState.getPacmanPosition()
        # oldFood = currentGameState.getFood()
        # newGhostStates = successorGameState.getGhostStates()
        # newScaredTimes = [ghostState.getScaredTimer() for ghostState in newGhostStates]

        # *** Your Code Here ***
        """ Claire's Comments:
        The reflex agent only takes actions based on the current state
        (ignoring past and future states).
        Looking at all legal actions, if an action leads to food eaten by Pacman,
        then Pacman should choose that action. If action doesnt lead to food,
        choose a random action.
        This evaluation function chooses the actions that give us the state with the
        highest score out of all possible ones.
        What we need:
        1. Distance to closest food dot
        2. Distance to closest ghost
        3. Current score
        Claire's score: 3/3
        """
        successorGameState = currentGameState.generatePacmanSuccessor(action)
        newPosition = successorGameState.getPacmanPosition()
        newGhostStates = successorGameState.getGhostStates()
        newFood = successorGameState.getFood()

        # Successor score
        succScore = successorGameState.getScore()
        score = succScore
        # print("succScore: %s" % (str(succScore)))

        # Getting the list of the distances of all food dots from pacman
        foodList = newFood.asList()
        # print("foodList: %s" % (str(foodList)))
        # list of distances from Pacman position to all of the food
        foodDist = []
        for food in foodList:
            foodDist.append(distance.manhattan(newPosition, food))
        # The closest food dot to pacman (an integer)
        if len(foodDist):
            closestFood = min(foodDist)
            # Score is inversely proportional to how good or bad Pacman is doing.
            # If eating food, then Pacman is doing good which means score gets better.
            score = score + float(1 / closestFood)
        # print("closestFood: %s" % (str(closestFood)))

        # List of distances from Pacman position to ghosts
        newGhostDist = []
        for ghost in newGhostStates:
            newGhostDist.append(distance.manhattan(
                newPosition, ghost.getPosition()))
        # The closest ghost to pacman (a float number)
        closestNewGhost = min(newGhostDist)
        # print("closestNewGhost: %s" % (str(closestNewGhost)))

        # Score is inversely proportional to how good or bad Pacman is doing.
        # If ghost is nearby, then bad is doing bad and which means score goes down.
        if closestNewGhost >= 1:
            score = score - float(1 / closestNewGhost)

        # print("score: %s" % (str(score)))
        # score is a float number because ghost.getPosition() returns a float
        return score

        # return successorGameState.getScore()

class MinimaxAgent(MultiAgentSearchAgent):
    """
    A minimax agent.

    Here are some method calls that might be useful when implementing minimax.

    `pacai.core.gamestate.AbstractGameState.getNumAgents()`:
    Get the total number of agents in the game

    `pacai.core.gamestate.AbstractGameState.getLegalActions`:
    Returns a list of legal actions for an agent.
    Pacman is always at index 0, and ghosts are >= 1.

    `pacai.core.gamestate.AbstractGameState.generateSuccessor`:
    Get the successor game state after an agent takes an action.

    `pacai.core.directions.Directions.STOP`:
    The stop direction, which is always legal, but you may not want to include in your search.

    Method to Implement:

    `pacai.agents.base.BaseAgent.getAction`:
    Returns the minimax action from the current gameState using
    `pacai.agents.search.multiagent.MultiAgentSearchAgent.getTreeDepth`
    and `pacai.agents.search.multiagent.MultiAgentSearchAgent.getEvaluationFunction`.
    """

    def __init__(self, index, **kwargs):
        super().__init__(index, **kwargs)
        self.index = index

    def getAction(self, currentGameState):
        """
        Returns the minimax action from the current gameState using
        `pacai.agents.search.multiagent.MultiAgentSearchAgent.getTreeDepth`
        and `pacai.agents.search.multiagent.MultiAgentSearchAgent.getEvaluationFunction`.
        Claire notes:
        pacman index starts at 0 and then the rest of the agents (the ghosts)
        Claire's score: 5/5
        """
        # numAgents = currentGameState.getNumAgents()
        # print("numAgents: %s" % (str(numAgents)))
        # legalAction = currentGameState.getLegalActions()
        # print("legalAction: %s" % (str(legalAction)))
        # successorG = currentGameState.generateSuccessor()
        # print("successorG: %s" % (str(successorG)))

        # Initializing the current agent we are on's index to zero
        # because pacman is first agent at index 0 and the ghosts follow after.
        agentIndex = 0
        depth = 0
        value, move = self.max_value(currentGameState, agentIndex, depth)
        # print("move is: %s" % (str(move)))
        return move

    def max_value(self, currentGameState, agentIndex, depth):
        if currentGameState.isLose() or currentGameState.isWin() or depth == self.getTreeDepth():
            # print("done here")
            return self.getEvaluationFunction()(currentGameState), 'no action taken'
        maxVal = -float("inf")
        actionTaken = ''
        for action in currentGameState.getLegalActions(agentIndex):
            # we dont care about if the direction is STOP so skip it
            if action != Directions.STOP:
                # actionTaken = action
                value, move = self.min_value(
                    currentGameState.generateSuccessor(agentIndex, action), 1, depth)
                # print("value is: %s" % (str(value)))
                if value > maxVal:
                    maxVal = value
                    actionTaken = action
        # print("maxVal is: %s" % (str(maxVal)))
        return maxVal, actionTaken

    def min_value(self, currentGameState, agentIndex, depth):
        if currentGameState.isLose() or currentGameState.isWin() or depth == self.getTreeDepth():
            # print("done here")
            return self.getEvaluationFunction()(currentGameState), 'no action taken'
            # print("agentIndex is: %s" % (str(agentIndex)))
            # If we are finished with the ghosts, reset index to 0 to
            # be pacmans turn, and also increase the depth.
        minVal = float("inf")
        actionTaken = ''
        value = 0
        if agentIndex < currentGameState.getNumAgents() - 1:
            for action in currentGameState.getLegalActions(agentIndex):
                # we dont care about if the direction is STOP so skip it
                if action != Directions.STOP:
                    value, move = self.min_value(currentGameState.generateSuccessor(
                        agentIndex, action), agentIndex + 1, depth)
                    if value < minVal:
                        minVal = value
                        actionTaken = action
                    # print("minVal is: %s" % (str(minVal)))
        else:
            for action in currentGameState.getLegalActions(agentIndex):
                # we dont care about if the direction is STOP so skip it
                if action != Directions.STOP:
                    value, move = self.max_value(currentGameState.generateSuccessor(
                        agentIndex, action), 0, depth + 1)
                    # print("value is: %s" % (str(value)))
                    if value < minVal:
                        minVal = value
                        actionTaken = action

        return minVal, actionTaken

class AlphaBetaAgent(MultiAgentSearchAgent):
    """
    A minimax agent with alpha-beta pruning.

    Method to Implement:

    `pacai.agents.base.BaseAgent.getAction`:
    Returns the minimax action from the current gameState using
    `pacai.agents.search.multiagent.MultiAgentSearchAgent.getTreeDepth`
    and `pacai.agents.search.multiagent.MultiAgentSearchAgent.getEvaluationFunction`.
    """

    def __init__(self, index, **kwargs):
        super().__init__(index)

    def getAction(self, currentGameState):
        """
        Returns the minimax action from the current gameState using
        `pacai.agents.search.multiagent.MultiAgentSearchAgent.getTreeDepth`
        and `pacai.agents.search.multiagent.MultiAgentSearchAgent.getEvaluationFunction`.
        Claire notes:
        pacman index starts at 0 and then the rest of the agents (the ghosts)
        Claire's score: 4/4
        """
        # numAgents = currentGameState.getNumAgents()
        # print("numAgents: %s" % (str(numAgents)))
        # legalAction = currentGameState.getLegalActions()
        # print("legalAction: %s" % (str(legalAction)))
        # successorG = currentGameState.generateSuccessor()
        # print("successorG: %s" % (str(successorG)))

        # Initializing the current agent we are on's index to zero
        # because pacman is first agent at index 0 and the ghosts follow after.
        agentIndex = 0
        depth = 0
        alpha = -float("inf")
        beta = float("inf")
        value, move = self.max_value(
            currentGameState, agentIndex, depth, alpha, beta)
        # print("move is: %s" % (str(move)))
        return move

    def max_value(self, currentGameState, agentIndex, depth, alpha, beta):
        if currentGameState.isLose() or currentGameState.isWin() or depth == self.getTreeDepth():
            # print("done here")
            return self.getEvaluationFunction()(currentGameState), 'no action taken'
        maxVal = -float("inf")
        actionTaken = ''
        for action in currentGameState.getLegalActions(agentIndex):
            # we dont care about if the direction is STOP so skip it
            if action != Directions.STOP:
                # actionTaken = action
                value, move = self.min_value(
                    currentGameState.generateSuccessor(agentIndex, action), 1, depth, alpha, beta)
                # print("value is: %s" % (str(value)))
                if value > maxVal:
                    maxVal = value
                    actionTaken = action
                    alpha = max(alpha, maxVal)
                if maxVal >= beta:
                    return maxVal, actionTaken
        # print("maxVal is: %s" % (str(maxVal)))
        return maxVal, actionTaken

    def min_value(self, currentGameState, agentIndex, depth, alpha, beta):
        if currentGameState.isLose() or currentGameState.isWin() or depth == self.getTreeDepth():
            # print("done here")
            return self.getEvaluationFunction()(currentGameState), 'no action taken'
            # print("agentIndex is: %s" % (str(agentIndex)))
            # If we are finished with the ghosts, reset index to 0 to
            # be pacmans turn, and also increase the depth.
        minVal = float("inf")
        actionTaken = ''
        value = 0
        if agentIndex < currentGameState.getNumAgents() - 1:
            for action in currentGameState.getLegalActions(agentIndex):
                # we dont care about if the direction is STOP so skip it
                if action != Directions.STOP:
                    value, move = self.min_value(currentGameState.generateSuccessor(
                        agentIndex, action), agentIndex + 1, depth, alpha, beta)
                    if value < minVal:
                        minVal = value
                        actionTaken = action
                        beta = min(beta, minVal)
                    if minVal <= alpha:
                        return minVal, actionTaken
                    # print("minVal is: %s" % (str(minVal)))
        else:
            for action in currentGameState.getLegalActions(agentIndex):
                # we dont care about if the direction is STOP so skip it
                if action != Directions.STOP:
                    value, move = self.max_value(currentGameState.generateSuccessor(
                        agentIndex, action), 0, depth + 1, alpha, beta)
                    # print("value is: %s" % (str(value)))
                    if value < minVal:
                        minVal = value
                        actionTaken = action
                        beta = min(beta, minVal)
                    if minVal <= alpha:
                        return minVal, actionTaken

        return minVal, actionTaken

class ExpectimaxAgent(MultiAgentSearchAgent):
    """
    An expectimax agent.

    All ghosts should be modeled as choosing uniformly at random from their legal moves.

    Method to Implement:

    `pacai.agents.base.BaseAgent.getAction`:
    Returns the expectimax action from the current gameState using
    `pacai.agents.search.multiagent.MultiAgentSearchAgent.getTreeDepth`
    and `pacai.agents.search.multiagent.MultiAgentSearchAgent.getEvaluationFunction`.
    """

    def __init__(self, index, **kwargs):
        super().__init__(index, **kwargs)

    def getAction(self, currentGameState):
        """
        Returns the expectimax action from the current gameState using
        `pacai.agents.search.multiagent.MultiAgentSearchAgent.getTreeDepth`
        and `pacai.agents.search.multiagent.MultiAgentSearchAgent.getEvaluationFunction`.
        Claire notes:
        pacman index starts at 0 and then the rest of the agents (the ghosts)
        Claire's score: 4/4
        """
        # agentIndex = 0
        # depth = 0
        # print("numAgents is: %s" % (str(currentGameState.getNumAgents())))
        value, move = self.max_value(currentGameState, 0, 0)
        # print("move is: %s" % (str(move)))
        return move

    def max_value(self, currentGameState, agentIndex, depth):
        if currentGameState.isLose() or currentGameState.isWin() or depth == self.getTreeDepth():
            # print("done here")
            return self.getEvaluationFunction()(currentGameState), 'no action taken'
        maxVal = -float("inf")
        actionTaken = ''
        for action in currentGameState.getLegalActions(agentIndex):
            # we dont care about if the direction is STOP so skip it
            if action != Directions.STOP:
                # actionTaken = action
                value, move = self.exp_value(
                    currentGameState.generateSuccessor(agentIndex, action), 1, depth)
                # print("value is: %s" % (str(value)))
                if value > maxVal:
                    maxVal = value
                    actionTaken = action
        # print("maxVal is: %s" % (str(maxVal)))
        return maxVal, actionTaken

    def exp_value(self, currentGameState, agentIndex, depth):
        if currentGameState.isLose() or currentGameState.isWin() or depth == self.getTreeDepth():
            # print("done here")
            return self.getEvaluationFunction()(currentGameState), 'no action taken'
            # print("agentIndex is: %s" % (str(agentIndex)))
            # If we are finished with the ghosts, reset index to 0 to
            # be pacmans turn, and also increase the depth.
        val = 0
        actionTaken = ''
        # value = 0
        sumVals = 0
        if agentIndex < currentGameState.getNumAgents() - 1:
            for action in currentGameState.getLegalActions(agentIndex):
                # we dont care about if the direction is STOP so skip it
                if action != Directions.STOP:
                    value, move = self.exp_value(currentGameState.generateSuccessor(
                        agentIndex, action), agentIndex + 1, depth)
                    sumVals = sumVals + value
                    probability = 1 / len(currentGameState.getLegalActions(agentIndex))
                    expVal = sumVals * probability
                    # print("value is: %s" % (str(value)))
                    # print("sumVals is: %s" % (str(sumVals)))
                    if expVal < val:
                        val = expVal
                        actionTaken = action
                    # print("minVal is: %s" % (str(minVal)))
        else:
            for action in currentGameState.getLegalActions(agentIndex):
                # we dont care about if the direction is STOP so skip it
                if action != Directions.STOP:
                    value, move = self.max_value(currentGameState.generateSuccessor(
                        agentIndex, action), 0, depth + 1)
                    # print("value is: %s" % (str(value)))
                    sumVals = sumVals + value
                    probability = 1 / len(currentGameState.getLegalActions(agentIndex))
                    expVal = sumVals * probability
                    if expVal < val:
                        val = expVal
                        actionTaken = action

        return val, actionTaken

def betterEvaluationFunction(currentGameState):
    """
    Your extreme ghost-hunting, pellet-nabbing, food-gobbling, unstoppable evaluation function.

    DESCRIPTION: <write something here so we know what you did>
    Claire's score: 2/4
    """

    newPosition = currentGameState.getPacmanPosition()
    newGhostStates = currentGameState.getGhostStates()
    newFood = currentGameState.getFood()

    # Successor score
    currScore = currentGameState.getScore()
    score = currScore
    # print("succScore: %s" % (str(succScore)))

    # problem = AnyFoodSearchProblem(currentGameState)
    # return search.breadthFirstSearch(problem)

    # Getting the list of the distances of all food dots from pacman
    foodList = newFood.asList()
    # print("foodList: %s" % (str(foodList)))
    # list of distances from Pacman position to all of the food
    foodDist = []
    for food in foodList:
        foodDist.append(distance.manhattan(newPosition, food))
    # The closest food dot to pacman (an integer)
    if len(foodDist):
        closestFood = min(foodDist)
        # Score is inversely proportional to how good or bad Pacman is doing.
        # If eating food, then Pacman is doing good which means score gets better.
        score = score + float(50 / closestFood)
        # print("closestFood: %s" % (str(closestFood)))

    # List of distances from Pacman position to ghosts
    newGhostDist = []
    for ghost in newGhostStates:
        newGhostDist.append(distance.manhattan(
            newPosition, ghost.getPosition()))
    # The closest ghost to pacman (a float number)
    closestNewGhost = min(newGhostDist)
    # print("closestNewGhost: %s" % (str(closestNewGhost)))

    # Score is inversely proportional to how good or bad Pacman is doing.
    # If ghost is nearby, then bad is doing bad and which means score goes down.
    if closestNewGhost >= 1:
        score = score - float(50 / closestNewGhost)

    # print("score: %s" % (str(score)))
    # score is a float number because ghost.getPosition() returns a float
    return score

    # return currentGameState.getScore()

class ContestAgent(MultiAgentSearchAgent):
    """
    Your agent for the mini-contest.

    You can use any method you want and search to any depth you want.
    Just remember that the mini-contest is timed, so you have to trade off speed and computation.

    Ghosts don't behave randomly anymore, but they aren't perfect either -- they'll usually
    just make a beeline straight towards Pacman (or away if they're scared!)

    Method to Implement:

    `pacai.agents.base.BaseAgent.getAction`
    """

    def __init__(self, index, **kwargs):
        super().__init__(index)
