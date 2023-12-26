export interface ResultData {
  numero: number;
  partidas: Match[];
}

export interface Match {
  mandante: string;
  visitante: string;
  pontuacao_geral_mandante: Score;
  pontuacao_geral_visitante: Score;
}

export interface Score {
  total_pontos: number;
  total_vitorias: number;
  total_empates: number;
  total_derrotas: number;
  total_gols_marcados: number;
  total_gols_sofridos: number;
  saldo_gols: number;
}

export interface Classification {
  name: string;
  score: Score;
}