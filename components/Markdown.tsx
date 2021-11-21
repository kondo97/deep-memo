import React from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import markdown from 'styles/Markdown.module.css'

const Markdown = (props: any) => {
  console.log(props);
  return (
    <div className="Markdown">
      <ReactMarkdown plugins={[gfm]} unwrapDisallowed={false}>
        {props.contents}
      </ReactMarkdown>
    </div>
  );
};

export default Markdown;
