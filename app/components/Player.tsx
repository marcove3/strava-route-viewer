export default function Player({
  isPlaying,
  onPlay,
  onRw,
  onFf,
}: {
  isPlaying: boolean;
  onPlay: () => void;
  onRw: () => void;
  onFf: () => void;
}) {
  return (
    <div className="player">
      <button onClick={onRw}>Rewind</button>
      <button onClick={onPlay}>{isPlaying ? "Pause" : "Play"}</button>
      <button onClick={onFf}>Fast Forward</button>
    </div>
  );
}
