'use client';
import { useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Controls } from '@/components/controls';
import { useState, useEffect, useRef } from 'react';
import { Separator } from '@/components/ui/separator';
import DeleteLastScore from '@/components/delete-last-score';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import {
  EuroIcon,
  TrendingUp,
  Award,
  Trophy,
  BarChart2,
  X,
  User,
  GamepadIcon,
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import {
  Label,
  Pie,
  PieChart,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  Cell,
} from 'recharts';

import { Icons } from '@/components/icons';
const InfoIcon = Icons['info'];

export default function GameView({ gamedata, gamescore }) {
  const [score, setScore] = useState(gamescore);

  const scrollRef = useRef();

  useEffect(() => {
    if (scrollRef.current != null) {
      scrollRef.current.parentElement.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  }, [score]);

  const data = gamedata;

  const players = [
    {
      order: 1,
      player: data.player_1,
      player_avatar: data.player_1_avatar,
      score: score.player_1_score,
    },
    {
      order: 2,
      player: data.player_2,
      player_avatar: data.player_2_avatar,
      score: score.player_2_score,
    },
    {
      order: 3,
      player: data.player_3,
      player_avatar: data.player_3_avatar,
      score: score.player_3_score,
    },
  ];

  if (data.player_4 != null) {
    players.push({
      order: 4,
      player: data.player_4,
      player_avatar: data.player_4_avatar,
      score: score.player_4_score,
    });
  }

  const handleScoreUpdate = (newScore) => {
    setScore(newScore);
  };

  // Leaderboard array sorted (sort changes the main array)
  const origCopy = players.filter((player) => player);
  const leaderBoard = origCopy
    .sort((a, b) => {
      const lastScoreA = a.score[a.score.length - 1];
      const lastScoreB = b.score[b.score.length - 1];
      return lastScoreB - lastScoreA;
    })
    .map((player, index) => {
      let extraValue;
      switch (index) {
        case 0:
          extraValue = '🥇';
          break;
        case 1:
          extraValue = '🥈';
          break;
        case 2:
          extraValue = '🥉';
          break;
        case 3:
          extraValue = '🏅';
          break;
        // Add more cases if there are more players
        default:
          extraValue = 'default';
      }
      return {
        ...player,
        medal: extraValue,
      };
    });

  const avatarBorder = players[0].score.length % players.length;

  // console.log('game View', gamedata, gamescore);

  return (
    <Card
      className='relative block z-30 mx-auto max-w-md mb-10'
      ref={scrollRef}
    >
      <Sheet>
        <SheetTrigger className='flex-1 w-full sticky bg-background top-0 z-30 border-b justify-center items-center'>
          <CardHeader
            className={`relative grid ${
              players.length == 3 ? 'grid-cols-3' : 'grid-cols-4'
            } sticky bg-background top-0 z-30 border-b justify-center items-center`}
          >
            <Button
              variant='outline'
              className='absolute -top-2 -left-2 w-8 h-8'
              size='icon'
            >
              <InfoIcon className='w-4 h-4' />
            </Button>
            {players.map((player, key) => (
              <div
                style={{ margin: '0px' }}
                key={key}
                className='grid justify-center items-center'
              >
                <div
                  className={`inline-block rounded-full p-[4.5px] ${
                    key == avatarBorder ? 'bg-primary' : ''
                  }`}
                >
                  {' '}
                  <Avatar className='h-12 w-12 m-0 border-spacing-4'>
                    <AvatarImage
                      src={player.player_avatar}
                      alt={`avatar_${key}`}
                    />
                  </Avatar>
                </div>
              </div>
            ))}
          </CardHeader>
        </SheetTrigger>
        <SheetContent side='bottom' className='h-[90%]'>
          <SheetHeader className='flex justify-center items-center mb-2'>
            <SheetTitle></SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <Tabs defaultValue='score' className='w-full'>
            <TabsList className='grid w-full grid-cols-2 mx-auto max-w-md'>
              <TabsTrigger value='score'>
                <Trophy className='w-5 h-5' />
              </TabsTrigger>
              <TabsTrigger value='statistics'>
                <BarChart2 className='w-5 h-5' />
              </TabsTrigger>
            </TabsList>
            <TabsContent value='score'>
              <Card className='mx-auto max-w-md'>
                <CardHeader>
                  <div className='flex flex-row justify-center  items-start'>
                    <div className='flex  gap-2'>
                      {' '}
                      <div className='flex space-x-2 flex-row  items-center'>
                        {/* <h4 className=' text-sm'>Partijas</h4> */}
                        <Badge
                          variant='secondary'
                          className='text-xs sm:text-sm'
                        >
                          Partijas: {players[0].score.length}
                        </Badge>
                        {/* <Avatar className='h-7 w-7'>
                      <AvatarFallback>{players[0].score.length}</AvatarFallback>
                    </Avatar> */}
                      </div>
                      {gamedata.eur_points != null && (
                        <div className='flex space-x-2 flex-row justify-center items-center'>
                          {/* <h4 className='text-sm'>EUR / Punktā</h4> */}
                          <Badge
                            variant='secondary'
                            className='text-xs sm:text-sm flex items-center'
                          >
                            EUR / Punktā: {gamedata.eur_points}
                            <EuroIcon className='ml-1 w-3 h-3 sm:w-4 sm:h-4' />
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className='flex flex-col gap-4'>
                  {' '}
                  {leaderBoard.map((player, index) => (
                    <>
                      {' '}
                      <div key={index} className='flex items-center gap-4'>
                        <p className='text-2xl'>{player.medal}</p>
                        <div
                          className={`inline-block rounded-full p-[4.5px] ${
                            index == avatarBorder ? 'bg-primary' : ''
                          }`}
                        >
                          {' '}
                          <Avatar className={`h-8 w-8 m-0 `}>
                            <AvatarImage
                              src={player.player_avatar}
                              alt={`avatar_${player.player}`}
                            />
                          </Avatar>
                        </div>

                        <div>
                          <p className='font-semibold text-sm sm:text-base'>
                            {player.player}
                          </p>
                          <div className='flex flex-wrap gap-2 pt-1'>
                            <Badge>
                              {player.score.slice(-1)[0] != undefined
                                ? player.score.slice(-1)[0]
                                : 0}
                            </Badge>
                            {gamedata.eur_points != null && (
                              <Badge
                                variant='secondary'
                                className='text-xs flex items-center'
                              >
                                {player.score.slice(-1)[0] != undefined ? (
                                  <span className='flex justify-center items-center'>
                                    {(
                                      player.score.slice(-1)[0] *
                                      gamedata.eur_points
                                    ).toFixed(2)}{' '}
                                    <EuroIcon className='ml-0.5 w-3 h-3' />
                                  </span>
                                ) : (
                                  0
                                )}
                              </Badge>
                            )}

                            {index == avatarBorder && (
                              <Badge variant='outline'>Dalītājs</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      {index == leaderBoard.length - 1 ? null : <Separator />}
                    </>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value='statistics'>
              <Card className='mx-auto max-w-md'>
                <CardHeader>
                  <div className='flex flex-row justify-center  items-start'></div>
                </CardHeader>

                <CardContent className='flex flex-col justify-start items-start gap-4 w-full'>
                  <ScrollArea
                    className='w-full h-[400px] p-4'
                    data-custom-scroll='my-unique-scroll'
                  >
                    <style>
                      {`
                      [data-custom-scroll="my-unique-scroll"] [data-radix-scroll-area-viewport] div:first-child {
                          display: block !important;
                      }
                    `}
                    </style>
                    <div className=' space-y-14'>
                      {gamescore.scenarios.length > 0 ? (
                        <>
                          {' '}
                          <div className='w-full h-[300px]'>
                            <LineChartComponent
                              gameScore={gamescore}
                              gameData={gamedata}
                            />
                          </div>
                          <div className='w-full h-[300px]'>
                            <PieChartComponent data={gamescore} />
                          </div>
                          <div className='w-full'>
                            <GenerateZoleStatistics
                              results={gamescore.scenarios}
                            />
                          </div>
                        </>
                      ) : (
                        <div className='flex justify-center items-center h-[300px] text-center'>
                          Sāc skaitīt punktus lai redzētu statistiku 👨‍🏫
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </SheetContent>
      </Sheet>

      <CardContent>
        <ScoreRows
          score={score}
          rowsCount={players[0].score.length}
          players={players}
          onScoreUpdate={handleScoreUpdate}
        />
      </CardContent>
      <CardFooter className='flex justify-center'>
        {/* <div></div> */}
        <Controls
          onScoreUpdate={handleScoreUpdate}
          gameId={data.id}
          players={players}
          scenarios={score.scenarios}
        />
      </CardFooter>
    </Card>
  );
}

const ScoreRows = ({ score, rowsCount, players, onScoreUpdate }) => {
  console.log('score rows', score);
  const arr = [];
  for (let i = 0; i < rowsCount; i++) {
    console.log('ROW SCENARIO', score.scenarios[i]);
    arr.push(
      <div key={i}>
        <div>
          <div
            className={`relative grid grid-cols-${players.length} justify-center items-center`}
          >
            {score.scenarios[i] != undefined &&
              score.scenarios[i].GT == 'Zole' && (
                <Badge
                  variant='secondary'
                  className='absolute -left-4 md:-left-3 px-2 py-0.5 text-xs'
                >
                  Zole
                </Badge>
              )}
            <Point i={i} score={players[0].score[i]} rowsCount={rowsCount} />
            <Point i={i} score={players[1].score[i]} rowsCount={rowsCount} />
            <Point i={i} score={players[2].score[i]} rowsCount={rowsCount} />
            {players.length != 3 && (
              <Point i={i} score={players[3].score[i]} rowsCount={rowsCount} />
            )}
            {i == rowsCount - 1 && (
              <DeleteLastScore score={score} onScoreUpdate={onScoreUpdate} />
            )}
          </div>
          <Separator />
        </div>
      </div>
    );
  }

  return <div>{arr}</div>;
};

const Point = ({ i, score, rowsCount }) => {
  return (
    <div
      className={`flex justify-center px-3 sm:px-6 py-4  ${
        i == rowsCount - 1 &&
        ' font-extrabold transition-all duration-500 demo-dark:text-slate-100'
      } `}
    >
      {i == rowsCount - 1 ? (
        <Badge className='text-base'>{score}</Badge>
      ) : (
        score
      )}
    </div>
  );
};

const PieChartComponent = ({ data }) => {
  console.log(data.scenarios);
  const chartData = [
    {
      gt: 'lielais',
      games: data.scenarios.filter((x) => x.GT == 'Lielais').length,
      fill: 'hsl(var(--chart-1))',
    },
    {
      gt: 'zole',
      games: data.scenarios.filter((x) => x.GT == 'Zole').length,
      fill: 'hsl(var(--chart-2))',
    },
    {
      gt: 'maza_zole',
      games: data.scenarios.filter((x) => x.GT == 'Mazā zole').length,
      fill: 'hsl(var(--chart-3))',
    },
    {
      gt: 'galdins',
      games: data.scenarios.filter((x) => x.GT == 'Galdiņš').length,
      fill: 'hsl(var(--chart-4))',
    },
  ];
  const chartConfig = {
    games: {
      label: 'Partijas',
    },
    lielais: {
      label: 'Lielais',
      color: 'hsl(var(--chart-1))',
    },
    zole: {
      label: 'Zole',
      color: 'hsl(var(--chart-2))',
    },
    maza_zole: {
      label: 'Mazā zole',
      color: 'hsl(var(--chart-3))',
    },
    galdins: {
      label: 'Galdiņš',
      color: 'hsl(var(--chart-4))',
    },
  };

  const totalGames = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.games, 0);
  }, []);

  return (
    <>
      {' '}
      <p className='-mb-2 text-lg text-center'>Scenāriju iedalījums</p>{' '}
      <ChartContainer
        config={chartConfig}
        className='w-full h-full mx-auto  max-h-[250px]'
      >
        <PieChart className=''>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={chartData}
            dataKey='games'
            nameKey='gt'
            innerRadius={60}
            strokeWidth={5}
            labelLine={false}
            // label
            animationDuration={800}
            animationBegin={0}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor='middle'
                      dominantBaseline='middle'
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className='fill-foreground text-3xl font-bold'
                      >
                        {totalGames.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className='fill-muted-foreground'
                      >
                        Partijas
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
          <ChartLegend
            content={({ payload }) => (
              <ul className='flex justify-center flex-wrap gap-2'>
                {chartData.map((item) => (
                  <li key={item.gt} className='flex items-center gap-2'>
                    <span
                      className='w-4 h-4 rounded-full'
                      style={{ backgroundColor: item.fill }}
                    />
                    <span>
                      {chartConfig[item.gt].label} ({item.games})
                    </span>
                  </li>
                ))}
              </ul>
            )}
          />
        </PieChart>
      </ChartContainer>
    </>
  );
};

const LineChartComponent = ({ gameScore, gameData }) => {
  const players = [
    {
      player: gameData.player_1,
      score: gameScore.player_1_score,
    },
    {
      player: gameData.player_2,
      score: gameScore.player_2_score,
    },
    {
      player: gameData.player_3,
      score: gameScore.player_3_score,
    },
    {
      player: gameData.player_4,
      score: gameScore.player_4_score,
    },
  ].filter((x) => x.player != null);

  // console.log('LINE', players);

  const maxRounds = Math.max(...players.map((p) => p.score.length));

  const scoreData = Array.from({ length: maxRounds }, (_, i) => {
    let round = { partija: i + 1 }; // Create round object with round number
    players.forEach((player) => {
      round[player.player] = player.score[i] ?? 0; // Use score if available, else 0
    });
    return round;
  });

  // Generate dynamic config
  const chartConfig = players.reduce((acc, player, index) => {
    acc[player.player] = {
      label: player.player,
      color: `hsl(var(--chart-${index + 1}))`, // Dynamic color for each player
    };
    return acc;
  }, {});

  // Generate dynamic Line components
  const lineElements = players.map((player, index) => (
    <Line
      key={player.player}
      type='monotone'
      dataKey={player.player}
      stroke={`hsl(var(--chart-${index + 1}))`} // Matching color
      animationDuration={800}
      animationBegin={0}
    />
  ));

  return (
    <>
      <p className='text-lg mb-5 text-center'>Punktu Progress</p>{' '}
      <ChartContainer
        config={chartConfig}
        className='h-[250px] w-full flex justify-center'
      >
        <LineChart
          data={scoreData}
          // margin={{ top: 20, right: 0, left: 0, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='partija' />
          <YAxis width={20} />
          <ChartTooltip />
          <ChartLegend />
          {lineElements} {/* Insert dynamically generated Lines */}
        </LineChart>
      </ChartContainer>
    </>
  );
};

const GenerateZoleStatistics = ({ results }) => {
  const playerStats = {};

  results.forEach((result) => {
    const player = result.W;
    const gameType = result.GT;
    const outcome = result.L;

    if (!playerStats[player]) {
      playerStats[player] = {
        totalGames: 0,
        wins: 0,
        losses: 0,
        gameTypes: {},
      };
    }

    playerStats[player].totalGames++;
    if (outcome === 'Uzvarēja') playerStats[player].wins++;
    if (outcome === 'Zaudēja') playerStats[player].losses++;

    if (!playerStats[player].gameTypes[gameType]) {
      playerStats[player].gameTypes[gameType] = {
        total: 0,
        wins: 0,
      };
    }
    playerStats[player].gameTypes[gameType].total++;
    if (outcome === 'Uzvarēja') {
      playerStats[player].gameTypes[gameType].wins++;
    }
  });

  const statistics = Object.entries(playerStats).map(([player, stats]) => {
    const mostPlayedGameType = Object.entries(stats.gameTypes).reduce(
      (max, [type, typeStats]) =>
        typeStats.total > max.total ? { type, ...typeStats } : max,
      { total: 0 }
    );

    return {
      name: player,
      game: mostPlayedGameType.type,
      played: mostPlayedGameType.total,
      won: mostPlayedGameType.wins,
      lost: mostPlayedGameType.total - mostPlayedGameType.wins,
    };
  });

  return (
    <div className='space-y-6'>
      {statistics.map((player) => (
        <div key={player.name} className='rounded-lg shadow-sm'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-3'>
              {/* <User className='h-6 w-6 ' /> */}
              <div>
                <h3 className='text-lg font-semibold '>{player.name}</h3>
                <p className='text-sm '>
                  {`izspēlēja ${player.played} x `}{' '}
                  <span className='text-base font-bold '>
                    {`"${player.game}"`}
                  </span>{' '}
                </p>
              </div>
            </div>
            {/* <div className='text-right'>
              <p className='text-xl font-bold text-primary'>{player.game}</p>
            </div> */}
          </div>
          <div className='mt-4 flex flex-row justify-between'>
            <div className='text-center'>
              <p className='text-xl font-bold text-custom-text1-light dark:text-custom-text1-dark'>
                {player.won}
              </p>
              <p className='text-sm text-gray-500'>Uzvarēja</p>
            </div>
            <div className='text-center'>
              <p className='text-xl font-bold text-custom-text2-light dark:text-custom-text2-dark'>
                {player.lost}
              </p>
              <p className='text-sm text-gray-500'>Zaudēja</p>
            </div>
            <div className='text-center'>
              <p className='text-xl font-bold text-custom-text3-light dark:text-custom-text3-dark'>
                {((player.won / player.played) * 100).toFixed(0)}%
              </p>
              <p className='text-sm text-gray-500'>Uzvaru procents</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
