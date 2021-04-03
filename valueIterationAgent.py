from pacai.agents.learning.value import ValueEstimationAgent
from pacai.util import counter

class ValueIterationAgent(ValueEstimationAgent):
    """
    A value iteration agent.

    Make sure to read `pacai.agents.learning` before working on this class.

    A `ValueIterationAgent` takes a `pacai.core.mdp.MarkovDecisionProcess` on initialization,
    and runs value iteration for a given number of iterations using the supplied discount factor.

    Some useful mdp methods you will use:
    `pacai.core.mdp.MarkovDecisionProcess.getStates`,
    `pacai.core.mdp.MarkovDecisionProcess.getPossibleActions`,
    `pacai.core.mdp.MarkovDecisionProcess.getTransitionStatesAndProbs`,
    `pacai.core.mdp.MarkovDecisionProcess.getReward`.

    Additional methods to implement:

    `pacai.agents.learning.value.ValueEstimationAgent.getQValue`:
    The q-value of the state action pair (after the indicated number of value iteration passes).
    Note that value iteration does not necessarily create this quantity,
    and you may have to derive it on the fly.

    `pacai.agents.learning.value.ValueEstimationAgent.getPolicy`:
    The policy is the best action in the given state
    according to the values computed by value iteration.
    You may break ties any way you see fit.
    Note that if there are no legal actions, which is the case at the terminal state,
    you should return None.
    """

    def __init__(self, index, mdp, discountRate = 0.9, iters = 100, **kwargs):
        super().__init__(index)

        self.mdp = mdp
        self.discountRate = discountRate
        self.iters = iters
        self.values = counter.Counter()  # A Counter is a dict with default 0

        # Compute the values here.
        # print("counter: %s" % (str(counter)))
        # print("self.mdp: %s" % (str(self.mdp)))
        # print("self.discountRate: %s" % (str(self.discountRate)))
        # print("self.iters: %s" % (str(self.iters)))
        # print("self.values: %s" % (str(self.values)))

        # V(state) = max_{action in actions} Q(state, action)
        for iteration in range(self.iters):
            # Keeping a temporary dictionary to update self.values in the end
            temp = counter.Counter()
            # Getting each state in the mdp
            for state in self.mdp.getStates():
                maxVal = -float("inf")
                # print("states in self.values: %s" % (str(state)))
                # Getting the possible actions at the current state
                for action in self.mdp.getPossibleActions(state):
                    value = self.getQValue(state, action)
                    # print("value is: %s" % (str(value)))
                    # Updating the max value with the value iteration sum
                    # and updating temp dict with the maxval to set to self.values in the end
                    if value > maxVal:
                        maxVal = value
                        temp[state] = maxVal
            # setting self.values to the updated value from following the
            # value iteration formula
            self.values = temp
        # print("self.values: %s" % (str(self.values)))

    def getValue(self, state):
        """
        Return the value of the state (computed in __init__).
        """
        # print("self.values: %s" % (str(self.values[state])))
        return self.values[state]

    def getAction(self, state):
        """
        Returns the policy at the state (no exploration).
        """
        return self.getPolicy(state)

    def getQValue(self, state, action):
        """
        The q-value of the state action pair (after the
        indicated number of value iteration passes).
        Note that value iteration does not necessarily create
        this quantity, and you may have to derive it on the fly.
        Should return Q(state,action).
        """
        QVal = 0
        # Getting the transition probability at the current state
        # A list of tuples with the state and probability in each tuple
        transition = self.mdp.getTransitionStatesAndProbs(state, action)
        for singleTransition in transition:
            nextState = singleTransition[0]
            probability = singleTransition[1]
            reward = self.mdp.getReward(state, action, nextState)
            # Following the value iteration formula
            QVal += probability * \
                (reward + (self.discountRate * self.values[nextState]))
        # print("QValue: %s" % (str(QValue)))
        return QVal

    def getPolicy(self, state):
        """
        The policy is the best action in the given state
        according to the values computed by value iteration.
        You may break ties any way you see fit.
        Note that if there are no legal actions, which is the
        case at the terminal state, you should return None.
        policy(state) = arg_max_{action in actions} Q(state, action)
        """
        maxVal = -float("inf")
        tempActions = counter.Counter()
        if not self.mdp.getPossibleActions(state):
            return None
        for action in self.mdp.getPossibleActions(state):
            QValue = self.getQValue(state, action)
            if QValue > maxVal:
                maxVal = QValue
                tempActions[action] = maxVal
        result = tempActions.argMax()
        # print("result: %s" % (str(result)))
        return result
