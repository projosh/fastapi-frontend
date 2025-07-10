type LogProps = {
  timestamp: string;
  level: string;
  message: string;
  service: string;
};

const LogCard = ({ timestamp, level, message, service }: LogProps) => (
  <div className="bg-white p-4 mb-2 shadow rounded">
    <p><strong>{timestamp}</strong> [{level}] <span className="italic">{service}</span></p>
    <p>{message}</p>
  </div>
);

export default LogCard;
