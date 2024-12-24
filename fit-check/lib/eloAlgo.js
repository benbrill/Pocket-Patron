export const K = 32; // Sensitivity factor for ELO updates

export const calculateElo = (eloScores, winnerId, loserId) => {
    const R_w = eloScores[winnerId];
    const R_l = eloScores[loserId];

    const E_w = 1 / (1 + 10 ** ((R_l - R_w) / 400));
    const E_l = 1 - E_w;

    const updatedScores = { ...eloScores };
    updatedScores[winnerId] = R_w + K * (1 - E_w);
    updatedScores[loserId] = R_l + K * (0 - E_l);

    return updatedScores;
};
