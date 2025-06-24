type ArrowRightIconProps = {
  width?: number;
  height?: number;
  color?: string;
}

const ArrowRightIcon = ({ width = 32, height = 32, color = '#9DBAC0' }: ArrowRightIconProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={height} viewBox="0 -960 960 960" width={width} fill={color}><path d="m560-241.33-47.33-47.34L672-448H160v-66.67h512l-160-160L559.33-722 800-481.33l-240 240Z" /></svg>
  )
}

export default ArrowRightIcon