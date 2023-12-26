'use client'
import useSWR from "swr";
import { ResultData, Classification, Score } from "../result";
import { useEffect, useState } from "react";
import ResultList from "@/components/ResultList";
import { years } from "@/utils/utils";
import { useRouter } from "next/navigation";
import { API_URL } from "@/service/api";
import Error from "@/components/Error";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Result({ 
  params,
}: { 
  params: { year: string };
}) {
  const [result, setResult] = useState<Classification[]>([]);
  const apiUrl = `${API_URL}/${params.year}`;

  const { data, error } = useSWR<ResultData[], Error>(
    apiUrl,
    fetcher
  )

  const getScore = (teamScore: Score): Score => {
    return {
      total_pontos: teamScore.total_pontos,
      total_vitorias: teamScore.total_vitorias,
      total_empates: teamScore.total_empates,
      total_derrotas: teamScore.total_derrotas,
      total_gols_marcados: teamScore.total_gols_marcados,
      total_gols_sofridos: teamScore.total_gols_sofridos,
      saldo_gols: teamScore.total_gols_marcados - teamScore.total_gols_sofridos
    }
  }

  useEffect(() => {

    const lastRound = data ? data[data.length - 1] : null;
    const classification: Classification[] = [];

    lastRound?.partidas?.forEach(match => {
      const classificationItemHome: Classification = {
        name: match.mandante,
        score: getScore(match.pontuacao_geral_mandante)
      };

      classification.push(classificationItemHome);

      const classificationItemAway: Classification = {
        name: match.visitante,
        score: getScore(match.pontuacao_geral_visitante)
      };

      classification.push(classificationItemAway);

    });

    const sortedClassification = classification.sort((a, b) => 
      b.score.total_pontos - a.score.total_pontos || 
      b.score.total_vitorias - a.score.total_vitorias ||
      b.score.saldo_gols - a.score.saldo_gols);

    setResult(sortedClassification);

  }, [data]);


  const router = useRouter();
  const yearAsNumber = Number(params.year);
  if (!yearAsNumber || !years.includes(yearAsNumber)) {
    return router.push('/404')
  }
    
  if (error) {
    return <div className="flex justify-center my-10 mx-auto"><Error>{error.message}</Error></div>
  }

  return (
    <ResultList classification={result} year={params.year} />
  )
}