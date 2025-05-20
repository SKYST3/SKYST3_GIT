import styled from 'styled-components';

interface StarProps {
    x: number;
    y: number;
    color: string;
    size: number;
    onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

function Star({ x, y, color, size, onClick }: StarProps) {
    return (
        <StarIcon
            style={{
                left: `${x * 100}%`,
                top: `${y * 100}%`,
                background: color,
                width: size,
                height: size,
            }}
            onClick={onClick}
        />
    );
}

const StarIcon = styled.div`
    position: absolute;
    width: 18px;
    height: 18px;
    background: yellow;
    border-radius: 50%;
    box-shadow: 0 0 8px 2px #fff8;
    cursor: pointer;
    transform: translate(-50%, -50%);
    transition: box-shadow 0.2s;
    &:hover {
        box-shadow: 0 0 16px 4px #fff;
    }
`;

export default Star;
