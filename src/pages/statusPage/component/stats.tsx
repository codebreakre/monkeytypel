import { Text } from '@mantine/core';
import classes from './StatsGroup.module.css';

export interface Stats {
  count : number;
  title: string;
  detail: string;
}


export function StatsGroup({data}: {data: Stats[]}) {
 
  const stats = data.map((stat) => (
    <div key={stat.title} className={classes.stat}>
      <Text className={classes.count}>{stat.count}</Text>
      <Text className={classes.title}>{stat.title}</Text>
      <Text className={classes.description}>{stat.detail}</Text>
    </div>
  ));
  return <div className={`${classes.root} text-yellow-200 `}>{stats}</div>;
}