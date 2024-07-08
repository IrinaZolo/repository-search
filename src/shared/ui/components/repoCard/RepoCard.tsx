export default function RepoCard(props: { name: string; starsCount: number }) {
  return (
    <div>
      <h2>{props.name}</h2>
      <div>{props.starsCount}</div>
    </div>
  );
}
