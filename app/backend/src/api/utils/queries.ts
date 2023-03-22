const query = `
  SELECT t.team_name AS name,
  CAST(SUM(CASE 
        WHEN m.home_team_id = t.id AND m.home_team_goals > m.away_team_goals THEN 3 
        WHEN m.away_team_id = t.id AND m.away_team_goals > m.home_team_goals THEN 3 
        WHEN (m.home_team_id = t.id OR m.away_team_id = t.id)
        AND m.home_team_goals = m.away_team_goals THEN 1 
        ELSE 0 
    END) AS SIGNED) AS totalPoints,
  COUNT(CASE 
        WHEN m.home_team_id = t.id OR m.away_team_id = t.id THEN 1 
    END) AS totalGames,
  CAST(SUM(CASE 
        WHEN m.home_team_id = t.id AND m.home_team_goals > m.away_team_goals THEN 1 
        WHEN m.away_team_id = t.id AND m.away_team_goals > m.home_team_goals THEN 1 
        ELSE 0 
    END) AS SIGNED) AS totalVictories,
  CAST(SUM(CASE 
        WHEN m.home_team_id = t.id AND m.home_team_goals < m.away_team_goals THEN 1 
        WHEN m.away_team_id = t.id AND m.away_team_goals < m.home_team_goals THEN 1 
        ELSE 0 
    END) AS SIGNED) AS totalLosses,
  CAST(SUM(CASE 
        WHEN (m.home_team_id = t.id OR m.away_team_id = t.id)
        AND m.home_team_goals = m.away_team_goals THEN 1 
        ELSE 0 
    END) AS SIGNED) AS totalDraws,
  CAST(SUM(CASE 
        WHEN m.home_team_id = t.id THEN m.home_team_goals 
        ELSE m.away_team_goals 
    END) AS SIGNED) AS goalsFavor,
  CAST(SUM(CASE 
        WHEN m.home_team_id = t.id THEN m.away_team_goals 
        ELSE m.home_team_goals 
    END) AS SIGNED) AS goalsOwn,
  CAST(SUM(CASE 
        WHEN m.home_team_id = t.id THEN m.home_team_goals - m.away_team_goals 
        ELSE m.away_team_goals - m.home_team_goals 
    END) AS SIGNED) AS goalsBalance,
  CAST(SUM(CASE 
        WHEN m.home_team_id = t.id AND m.home_team_goals > m.away_team_goals THEN 3 
        WHEN m.away_team_id = t.id AND m.away_team_goals > m.home_team_goals THEN 3 
        WHEN (m.home_team_id = t.id OR m.away_team_id = t.id)
        AND m.home_team_goals = m.away_team_goals THEN 1 
        ELSE 0 
    END) / (COUNT(CASE 
                    WHEN m.home_team_id = t.id OR m.away_team_id = t.id THEN 1 
                END) * 3) * 100 AS DECIMAL(6, 2)) AS efficiency
  FROM matches AS m 
  JOIN teams AS t 
  ON t.id IN (m.home_team_id, m.away_team_id)
  WHERE NOT m.in_progress 
  GROUP BY t.id
  ORDER BY totalPoints DESC, totalVictories DESC, goalsBalance DESC, goalsFavor DESC, goalsOwn DESC;
`;

export default query;
