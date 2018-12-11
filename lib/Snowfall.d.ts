import * as React from 'react';
import Snowflake, { SnowflakeConfig } from './Snowflake';
export interface Props {
    color?: string;
    snowflakeCount?: number;
    style?: React.CSSProperties;
}
export interface State {
    width: number;
    height: number;
}
export default class Snowfall extends React.Component<Props, State> {
    canvasRef: React.RefObject<HTMLCanvasElement>;
    snowflakes: Array<Snowflake>;
    snowflakeCount: number;
    snowflakeConfig: SnowflakeConfig;
    lastUpdate: number;
    state: {
        width: number;
        height: number;
    };
    constructor(props: Props);
    componentDidMount(): void;
    componentWillUnmount(): void;
    resize: () => void;
    readonly canvas: HTMLCanvasElement;
    draw: () => void;
    update: (framesPassed?: number) => void;
    loop: () => void;
    render(): JSX.Element;
}
