"""
In this file, you will implement generic search algorithms which are called by Pacman agents.
"""
from ..util.stack import Stack
from ..util.queue import Queue
from ..util.priorityQueue import PriorityQueue

def depthFirstSearch(problem):
    """
    Search the deepest nodes in the search tree first [p 85].

    Your search algorithm needs to return a list of actions that reaches the goal.
    Make sure to implement a graph search algorithm [Fig. 3.7].

    To get started, you might want to try some of these simple commands to
    understand the search problem that is being passed in:
    ```
    print("Start: %s" % (str(problem.startingState())))
    print("Is the start a goal?: %s" % (problem.isGoal(problem.startingState())))
    print("Start's successors: %s" % (problem.successorStates(problem.startingState())))
    ```
    """
    # *** Your Code Here ***
    # print("Start: %s" % (str(problem.startingState())))
    # print("Is the start a goal?: %s" %
    #       (problem.isGoal(problem.startingState())))
    # print("Start's successors: %s" %
    #       (problem.successorStates(problem.startingState())))

    fringe = Stack()
    # Start state is a coordinate/location of a node like (5, 5)
    start_state = problem.startingState()
    # Pushing the start node onto the fringe stack
    # (coordinate, list of actions)
    # where the actions is a list of actions to get to goal state from start state,
    # like a path of actions
    fringe.push((start_state, []))
    # List of states visited during DFS
    visited = []

    # While the fringe stack is not empy
    while not fringe.isEmpty():
        # Pop off the most recently pushed item from the stack
        # It returns the state and list of actions taken
        state, actionsList = fringe.pop()
        # If the state we are on has not been visited yet
        if state not in visited:
            # Add state to visited list
            visited.append(state)
            # print("Visited list: %s" % (str(visited)))
            # If the state we have just visited is our goal state,
            #  return the actions list it took to get to goal
            if problem.isGoal(state):
                # print("Visited list: %s" % (str(visited)))
                return actionsList
            # Getting the successors of the current state
            successors = problem.successorStates(state)
            # Iterate through the successors of state
            # successor[0] is the state, successor[1] is the action
            for successor in successors:
                if successor[0] not in visited:
                    # Adding the action taken to the actionsList and pushing
                    # the new list onto the stack
                    fringe.push((successor[0], actionsList + [successor[1]]))
                    # Note: Using actionsList + [successor[1]] instead of
                    # actionsList.append(successor[1]) because we want to have
                    # a new list of actions whenever we move to a new state
            # print("Actions list: %s" % (str(actionsList)))
            # print("Single Action: %s" % (str(successor[1])))
    # raise NotImplementedError()

def breadthFirstSearch(problem):
    """
    Search the shallowest nodes in the search tree first. [p 81]
    """
    # *** Your Code Here ***
    fringe = Queue()
    # Start state is a coordinate/location of a node like (5, 5)
    start_state = problem.startingState()
    # Pushing the start node onto the fringe queue
    # (coordinate, list of actions)
    # where the actions is a list of actions to get to goal state from start state,
    # like a path of actions
    fringe.push((start_state, []))
    # List of states visited during BFS
    visited = []

    # While the fringe queue is not empy
    while not fringe.isEmpty():
        # Pop off the most recently pushed item from the queue
        # It returns the state and list of actions taken
        state, actionsList = fringe.pop()
        # If the state we are on has not been visited yet
        if state not in visited:
            # Add state to visited list
            visited.append(state)
            # print("Visited list: %s" % (str(visited)))
            # If the state we have just visited is our goal state, return the
            # actions list it took to get to goal
            if problem.isGoal(state):
                # print("Visited list: %s" % (str(visited)))
                return actionsList
            # Getting the successors of the current state
            successors = problem.successorStates(state)
            # print("Single Action: %s" % (str(successors)))
            # Iterate through the successors of state
            # successor[0] is the state, successor[1] is the action
            for successor in successors:
                if successor[0] not in visited:
                    # Adding the action taken to the actionsList and pushing the new list
                    # and the state onto the queue
                    fringe.push((successor[0], actionsList + [successor[1]]))
                    # Note: Using actionsList + [successor[1]] instead of
                    # actionsList.append(successor[1]) because we want to
                    # have a new list of actions whenever we move to a new state
            # print("Actions list: %s" % (str(actionsList)))
            # print("Single Action: %s" % (str(successor[0])))
            # print("Single Action: %s" % (str(successor[1])))
    # print("Single Action: %s" % (str(successors)))
    # raise NotImplementedError()

def uniformCostSearch(problem):
    """
    Search the node of least total cost first.
    """
    # *** Your Code Here ***
    # Using a priotity queue to prioritize the states/nodes with smaller cost
    fringe = PriorityQueue()
    # Start state is a coordinate/location of a node like (5, 5)
    start_state = problem.startingState()
    # Pushing the start node onto the fringe priorityQueue
    # (coordinate, list of actions, cost of actions)
    # where the actions is a list of actions to get to goal state from start state,
    # like a path of actions
    fringe.push((start_state, []), 0)
    # List of states visited during DFS
    visited = []
    cost = 0
    # While the fringe priorityQueue is not empy
    while not fringe.isEmpty():
        # Pop off the most recently pushed item from the priority queue
        # It returns the state, list of actions taken, and cost of actions
        state, actionsList = fringe.pop()
        # If the state we are on has not been visited yet
        if state not in visited:
            # Add state to visited list
            visited.append(state)
            # print("Visited list: %s" % (str(visited)))
            # If the state we have just visited is our goal state,
            # return the actions list it took to get to goal
            if problem.isGoal(state):
                return actionsList
            # Getting the successors of the current state
            successors = problem.successorStates(state)
            # Iterate through the successors of state
            # s = state, a = action, c = cost
            for s, a, c in successors:
                if s not in visited:
                    fringe.push((s, actionsList + [a]), cost + c)
    # raise NotImplementedError()

def aStarSearch(problem, heuristic):
    """
    Search the node that has the lowest combined cost and heuristic first.
    """
    # *** Your Code Here ***
    # Using a priotity queue to prioritize the states/nodes with smaller cost
    fringe = PriorityQueue()
    # Start state is a coordinate/location of a node like (5, 5)
    start_state = problem.startingState()
    # Pushing the start node onto the fringe priorityQueue
    # (coordinate, list of actions, cost of actions)
    # where the actions is a list of actions to get to goal state from start state,
    # like a path of actions
    fringe.push((start_state, []), 0)
    # List of states visited during DFS
    visited = []
    cost = 0
    # print("problem: %s" % (str(problem)))

    # While the fringe priorityQueue is not empy
    while not fringe.isEmpty():
        # Pop off the most recently pushed item from the priority queue
        # It returns the state, list of actions taken, and cost of actions
        state, actionsList = fringe.pop()
        # If the state we are on has not been visited yet
        if state not in visited:
            # Add state to visited list
            visited.append(state)
            # print("Visited list: %s" % (str(visited)))
            # If the state we have just visited is our goal state,
            # return the actions list it took to get to goal
            if problem.isGoal(state):
                return actionsList
            # Getting the successors of the current state
            successors = problem.successorStates(state)
            # Iterate through the successors of state
            # s = state, a = action, c = cost
            for s, a, c in successors:
                if s not in visited:
                    # Adding the current cost plus the new cost plus the heuristic
                    # to make the newCost
                    newCost = cost + c + heuristic(s, problem)
                    fringe.push((s, actionsList + [a]), newCost)
    # raise NotImplementedError()
