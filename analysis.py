"""
Analysis question.
Change these default values to obtain the specified policies through value iteration.
If any question is not possible, return just the constant NOT_POSSIBLE:
```
return NOT_POSSIBLE
```
"""

NOT_POSSIBLE = None

def question2():
    """
    What I Did:
    Noise is the randomness you want in your decision.
    Discount is not random, its the decision you wanna make and taking that decision.
    Discount and noise is a number between 0 and 1.
    We do not want any randonmess in this decision to cross the bridge because it
    is a straight path to the terminal state good rewards on the straight path.
    If it goes any other way thats random, then it will give us a bad reward of -100.
    Hence why i set the noise factor equal to zero.
    The command I ran:
    python3 -m pacai.bin.gridworld --agent value --iterations 100 --grid BridgeGrid
        --discount 0.9 --noise 0.0
    """

    answerDiscount = 0.9
    # changed to 0.0 from default 0.2
    answerNoise = 0.0

    return answerDiscount, answerNoise

def question3a():
    """
    Prefer the close exit (+1), risking the cliff (-10)
    What I Did:
    Discount and noise is a number between 0 and 1.
    Living reward can be greater than 1 or negative. It is the reward you get for
    going to a state.
    I changed noise to zero so the agent can get to the terminal state without any random moves.
    I used a negative living reward and low discount to get to the terminal state fast since the
    terminal state is the best state to get to.
    python3 -m pacai.bin.gridworld --agent value --iterations 100 --grid DiscountGrid
        --discount 0.2 --noise 0.0 --living-reward -1.0
    """

    answerDiscount = 0.2
    answerNoise = 0.0
    answerLivingReward = -1.0

    return answerDiscount, answerNoise, answerLivingReward

def question3b():
    """
    Prefer the close exit (+1), but avoiding the cliff (-10)
    What I Did:
    I used a low discount and a negative living reward because we want to get to the terminal
    state fast. I included some randomness because we want to start going North to avoid the cliff.
    python3 -m pacai.bin.gridworld --agent value --iterations 100 --grid DiscountGrid
        --discount 0.4 --noise 0.2 --living-reward -1.0
    """

    answerDiscount = 0.4
    answerNoise = 0.2
    answerLivingReward = -1.0

    return answerDiscount, answerNoise, answerLivingReward

def question3c():
    """
    Prefer the distant exit (+10), risking the cliff (-10)
    What I Did:
    I changed noise to zero so the agent can get to the terminal state without any random moves.
    Gave more living reward to be 0.5 to increase the payoff and because we can take longer to
    get to the terminal state.
    python3 -m pacai.bin.gridworld --agent value --iterations 100 --grid DiscountGrid
        --discount 0.9 --noise 0.0 --living-reward 0.5
    """

    answerDiscount = 0.9
    answerNoise = 0.0
    answerLivingReward = 0.5

    return answerDiscount, answerNoise, answerLivingReward

def question3d():
    """
    Prefer the distant exit (+10), avoiding the cliff (-10)
    Having a higher living reward with some random decisions is okay to do because
    we can take a longer route to the terminal state since
    python3 -m pacai.bin.gridworld --agent value --iterations 100 --grid DiscountGrid
        --discount 0.9 --noise 0.2 --living-reward 0.5
    """

    answerDiscount = 0.9
    answerNoise = 0.2
    answerLivingReward = 0.5

    return answerDiscount, answerNoise, answerLivingReward

def question3e():
    """
    Avoid both exits (also avoiding the cliff)
    Never having the opportunity to take the decision that we want (discount would be 0)
    and not having a random chance to possibly get the reward would make the noise be 0 as well.
    Having the discount and noise be 0 will never give the agent the opportunity
    to get to the terminal state.
    python3 -m pacai.bin.gridworld --agent value --iterations 100 --grid DiscountGrid
        --discount 0.0 --noise 0.0 --living-reward 0.0
    """

    answerDiscount = 0.0
    answerNoise = 0.0
    answerLivingReward = 0.0

    return answerDiscount, answerNoise, answerLivingReward

def question6():
    """
    If there is no possible epsilon and learning rate tuple, then I will return NOT_POSSIBLE.
    If there exists a tuple then return it, but I was not getting any possible solutions changing
    epsilon value so I set it to none as well as the learning rate to make it not possible.
    """

    # answerEpsilon = 0.3
    # answerLearningRate = 0.5
    answerEpsilon = None
    answerLearningRate = None
    if not (answerEpsilon, answerLearningRate):
        return NOT_POSSIBLE

if __name__ == '__main__':
    questions = [
        question2,
        question3a,
        question3b,
        question3c,
        question3d,
        question3e,
        question6,
    ]

    print('Answers to analysis questions:')
    for question in questions:
        response = question()
        print('    Question %-10s:\t%s' % (question.__name__, str(response)))
