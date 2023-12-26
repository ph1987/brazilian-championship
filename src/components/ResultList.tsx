import { Classification } from "@/app/results/result";
import Image from 'next/image'
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { firstYear, imgPath, lastYear, years } from "@/utils/utils";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import React from "react";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Link from "next/link";
import { useRouter } from "next/navigation";
import Loading from "./Loading";

interface Props {
  classification: Classification[];
  year: string;
}

function ResultList({ 
    classification, 
    year
  }: Props) {
  const [age] = React.useState(year);
  const router = useRouter();

  const handleChange = (event: SelectChangeEvent) => {
    const age = event.target.value;
    router.push(`/results/${age}`);
  };

  const numberYear = Number(year);

  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      maxWidth="800px" 
      marginTop="2rem" 
      marginBottom="2rem" 
      marginLeft="auto" 
      marginRight="auto"
      >
      <Box 
        display="flex" 
        flexDirection="column" 
        justifyContent="space-between"
        >
        <Box display="flex" 
            flexDirection="row" 
            justifyContent="space-between" 
            sx={{ minWidth: 120 }} 
            className={`mx-auto my-auto mb-7`}
          >
          <Link 
            href={`/results/${numberYear-1}`}
            style={{ pointerEvents: numberYear === firstYear ? 'none' : 'auto' }}
            aria-disabled={numberYear === firstYear}
          >
            <ArrowBackIosNewIcon 
              style={{
                marginTop: '12px', 
                marginRight: '10px',
                pointerEvents: numberYear === firstYear ? 'none' : 'auto',
                color: numberYear === firstYear ? 'lightgrey' : 'inherit'
              }} 
            />
          </Link>
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              onChange={handleChange}
            >
              {years.map((year) => (
                <MenuItem key={year} value={year}>{year}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Link href={`/results/${Number(year)+1}`} 
            style={{
              pointerEvents: numberYear === lastYear ? 'none' : 'auto',
            }}
            aria-disabled={numberYear === lastYear} 
          >
            <ArrowForwardIosIcon 
              style={{
                marginTop: '12px', 
                marginLeft: '10px', 
                pointerEvents: numberYear === lastYear ? 'none' : 'auto',
                color: numberYear === lastYear ? 'lightgrey' : 'inherit'
              }} 
            />
          </Link>
        </Box>

        <h1 className={`mx-auto my-auto text-xl font-semibold mb-6`}>Campeonato Brasileiro de {year}</h1>

        {classification.length ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Pts</TableCell>
                <TableCell>V</TableCell>
                <TableCell>E</TableCell>
                <TableCell>D</TableCell>
                <TableCell>GP</TableCell>
                <TableCell>GC</TableCell>
                <TableCell>S</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {classification.map((team, index) => (
                <TableRow
                  key={team.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{index+1}</TableCell>
                  <TableCell>
                    <Image
                      src={imgPath(team.name)}
                      width={25}
                      height={25}
                      alt={team.name.toLocaleLowerCase()}
                    />
                  </TableCell>
                  <TableCell>{index === 0 ? <b>{team.name}</b> : team.name}</TableCell>
                  <TableCell>{team.score.total_pontos}</TableCell>
                  <TableCell>{team.score.total_vitorias}</TableCell>
                  <TableCell>{team.score.total_empates}</TableCell>
                  <TableCell>{team.score.total_derrotas}</TableCell>
                  <TableCell>{team.score.total_gols_marcados}</TableCell>
                  <TableCell>{team.score.total_gols_sofridos}</TableCell>
                  <TableCell>{team.score.saldo_gols}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        ) : <div className="flex justify-center my-10"><Loading /></div>}
      </Box>
    </Box>
  );
}

export default ResultList;