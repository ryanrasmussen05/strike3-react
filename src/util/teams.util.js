import React from 'react';
import { AriSvg } from '../assets/ari';
import { AtlSvg } from '../assets/atl';
import { BalSvg } from '../assets/bal';
import { BufSvg } from '../assets/buf';
import { CarSvg } from '../assets/car';
import { ChiSvg } from '../assets/chi';
import { CinSvg } from '../assets/cin';
import { CleSvg } from '../assets/cle';
import { DalSvg } from '../assets/dal';
import { DenSvg } from '../assets/den';
import { DetSvg } from '../assets/det';
import { GbSvg } from '../assets/gb';
import { HouSvg } from '../assets/hou';
import { IndSvg } from '../assets/ind';
import { JaxSvg } from '../assets/jax';
import { KcSvg } from '../assets/kc';
import { LacSvg } from '../assets/lac';
import { LarSvg } from '../assets/lar';
import { MiaSvg } from '../assets/mia';
import { MinSvg } from '../assets/min';
import { NeSvg } from '../assets/ne';
import { NoSvg } from '../assets/no';
import { NygSvg } from '../assets/nyg';
import { NyjSvg } from '../assets/nyj';
import { OakSvg } from '../assets/oak';
import { PhiSvg } from '../assets/phi';
import { PitSvg } from '../assets/pit';
import { SfSvg } from '../assets/sf';
import { SeaSvg } from '../assets/sea';
import { TbSvg } from '../assets/tb';
import { TenSvg } from '../assets/ten';
import { WasSvg } from '../assets/was';
import { UnknownSvg } from '../assets/unknown';

export const AllTeams = [
  { name: 'Arizona Cardinals', abbreviation: 'ARI' },
  { name: 'Atlanta Falcons', abbreviation: 'ATL' },
  { name: 'Baltimore Ravens', abbreviation: 'BAL' },
  { name: 'Buffalo Bills', abbreviation: 'BUF' },
  { name: 'Carolina Panthers', abbreviation: 'CAR' },
  { name: 'Chicago Bears', abbreviation: 'CHI' },
  { name: 'Cincinnati Bengals', abbreviation: 'CIN' },
  { name: 'Cleveland Browns', abbreviation: 'CLE' },
  { name: 'Dallas Cowboys', abbreviation: 'DAL' },
  { name: 'Denver Broncos', abbreviation: 'DEN' },
  { name: 'Detroit Lions', abbreviation: 'DET' },
  { name: 'Green Bay Packers', abbreviation: 'GB' },
  { name: 'Houston Texans', abbreviation: 'HOU' },
  { name: 'Indianapolis Colts', abbreviation: 'IND' },
  { name: 'Jacksonville Jaguars', abbreviation: 'JAX' },
  { name: 'Kansas City Chiefs', abbreviation: 'KC' },
  { name: 'Los Angeles Chargers', abbreviation: 'LAC' },
  { name: 'Los Angeles Rams', abbreviation: 'LAR' },
  { name: 'Miami Dolphins', abbreviation: 'MIA' },
  { name: 'Minnesota Vikings', abbreviation: 'MIN' },
  { name: 'New England Patriots', abbreviation: 'NE' },
  { name: 'New Orleans Saints', abbreviation: 'NO' },
  { name: 'New York Giants', abbreviation: 'NYG' },
  { name: 'New York Jets', abbreviation: 'NYJ' },
  { name: 'Oakland Raiders', abbreviation: 'OAK' },
  { name: 'Philadelphia Eagles', abbreviation: 'PHI' },
  { name: 'Pittsburgh Steelers', abbreviation: 'PIT' },
  { name: 'San Francisco 49ers', abbreviation: 'SF' },
  { name: 'Seattle Seahawks', abbreviation: 'SEA' },
  { name: 'Tampa Bay Buccaneers', abbreviation: 'TB' },
  { name: 'Tennessee Titans', abbreviation: 'TEN' },
  { name: 'Washington Redskins', abbreviation: 'WAS' },
];

export const AllTeamsAdmin = [{ name: 'No Pick', abbreviation: 'NP' }].concat(AllTeams);

// eslint-disable-next-line complexity
export const getSvgForTeam = team => {
  switch (team) {
    case 'ARI': return <AriSvg />;
    case 'ATL': return <AtlSvg />;
    case 'BAL': return <BalSvg />;
    case 'BUF': return <BufSvg />;
    case 'CAR': return <CarSvg />;
    case 'CHI': return <ChiSvg />;
    case 'CIN': return <CinSvg />;
    case 'CLE': return <CleSvg />;
    case 'DAL': return <DalSvg />;
    case 'DEN': return <DenSvg />;
    case 'DET': return <DetSvg />;
    case 'GB': return <GbSvg />;
    case 'HOU': return <HouSvg />;
    case 'IND': return <IndSvg />;
    case 'JAX': return <JaxSvg />;
    case 'KC': return <KcSvg />;
    case 'LAC': return <LacSvg />;
    case 'LAR': return <LarSvg />;
    case 'MIA': return <MiaSvg />;
    case 'MIN': return <MinSvg />;
    case 'NE': return <NeSvg />;
    case 'NO': return <NoSvg />;
    case 'NYG': return <NygSvg />;
    case 'NYJ': return <NyjSvg />;
    case 'OAK': return <OakSvg />;
    case 'PHI': return <PhiSvg />;
    case 'PIT': return <PitSvg />;
    case 'SF': return <SfSvg />;
    case 'SEA': return <SeaSvg />;
    case 'TB': return <TbSvg />;
    case 'TEN': return <TenSvg />;
    case 'WAS': return <WasSvg />;
    case 'unknown': return <UnknownSvg />;
    default: return null;
  }
};
