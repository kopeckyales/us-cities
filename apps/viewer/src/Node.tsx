type Props = {
  level: number;
  onClick?: () => void;
  content: string;
  open?: boolean;
  children?: React.ReactNode;
};

export const Node: React.FC<Props> = ({ level, onClick, content, open, children }) => {
  return (
    <>
      <div
        className="p-4 hover:bg-slate-200 gap-5 hover:cursor-pointer flex"
        onClick={onClick}
        style={{ marginLeft: level * 50, cursor: onClick !== undefined ? "pointer" : "default" }}
      >
        {open !== undefined ? (
          open === true && (children as Array<React.ReactNode>).length === 0 ? (
            "..."
          ) : (
            <div style={open ? { transform: "rotate(90deg)" } : undefined}>{">"}</div>
          )
        ) : null}
        <div>{content}</div>
      </div>
      {open ? children : null}
    </>
  );
};
