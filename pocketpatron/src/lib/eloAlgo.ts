// ✅ Sensitivity factor for ELO updates
export const K: number = 32;

// ✅ Define types for the Elo scores
export interface EloScores {
    [showId: string]: number;
}

// ✅ Calculate Elo Ratings
/**
 * Updates the Elo ratings of two shows after a match.
 *
 * @param eloScores - An object mapping show IDs to their current Elo scores.
 * @param winnerId - The ID of the winning show.
 * @param loserId - The ID of the losing show.
 * @returns A new object with updated Elo scores for both shows.
 */
export const calculateElo = (
    eloScores: EloScores,
    winnerId: number,
    loserId: number
): EloScores => {
    // Validate IDs
    if (!(winnerId in eloScores) || !(loserId in eloScores)) {
        throw new Error('Invalid winnerId or loserId. Ensure both IDs exist in the Elo scores.');
    }

    const R_w: number = eloScores[winnerId];
    const R_l: number = eloScores[loserId];

    // Expected score calculations
    const E_w: number = 1 / (1 + 10 ** ((R_l - R_w) / 400));
    const E_l: number = 1 - E_w;

    // Calculate updated scores
    const updatedScores: EloScores = { ...eloScores };
    updatedScores[winnerId] = R_w + K * (1 - E_w);
    updatedScores[loserId] = R_l + K * (0 - E_l);

    return updatedScores;
};
