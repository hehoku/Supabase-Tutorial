export default function Work({ work }) {
  return (
    <div className="work">
      <a href={work.url}>
        <p>{work.title}</p>
      </a>
    </div>
  );
}
