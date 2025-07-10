type Props = {
  onSearch: (filters: any) => void;
};

const LogFilter = ({ onSearch }: Props) => {
  return (
    <div className="flex gap-2 mb-4">
      <input placeholder="Message" className="border p-2" onChange={(e) => onSearch({ q: e.target.value })} />
      <select onChange={(e) => onSearch({ level: e.target.value })} className="border p-2">
        <option value="">Level</option>
        <option value="INFO">INFO</option>
        <option value="WARNING">WARNING</option>
        <option value="ERROR">ERROR</option>
        <option value="DEBUG">DEBUG</option>
      </select>
      <input placeholder="Service" className="border p-2" onChange={(e) => onSearch({ service: e.target.value })} />
    </div>
  );
};

export default LogFilter;
