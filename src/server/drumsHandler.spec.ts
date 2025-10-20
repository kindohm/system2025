import { State } from "../state/state";
import { drumsHandler } from "./drumsHandler";

// Mock the state module
jest.mock("../state/state", () => ({
  ...jest.requireActual("../state/state"),
  getState: jest.fn(),
  updateState: jest.fn(),
}));

// Import the mocked function
import { getState, updateState } from "../state/state";

// Create a typed reference to the mocked function
const mockGetState = getState as jest.MockedFunction<typeof getState>;
const mockUpdateState = updateState as jest.MockedFunction<typeof updateState>;

describe("drumsHandler", () => {
  beforeEach(() => {
    // Clear all mock calls before each test
    jest.clearAllMocks();
  });

  it("should keep the same nested array structure when nudging markov", () => {
    const startingMarkovStates = [
      [0.5, 0.5, 0.5],
      [0.5, 0.5, 0.5],
      [0.5, 0.5, 0.5],
    ];

    const mockState: State = {
      drums: { playing: true, mask: "1", markovStates: startingMarkovStates },
    };

    // Configure the mock to return your test state
    mockGetState.mockReturnValue(mockState);
    mockUpdateState.mockImplementation((newState) => newState);

    const result = drumsHandler.markov.nudge();

    expect(result.drums.markovStates.length).toEqual(3);

    // @ts-expect-error
    expect(result.drums.markovStates[0].length).toEqual(3);
    // @ts-expect-error
    expect(result.drums.markovStates[1].length).toEqual(3);
  });
});
