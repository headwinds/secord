import React, { useState, useEffect } from "react";
// import { connect } from 'react-redux'

interface ColonistListProps {
  page: number;
}

type Colonist = {
  name: string;
};

type ColonistCollection = Colonist[];

interface ColonistResult {
  colonists: ColonistCollection;
}

const ColonistList: React.FunctionComponent<ColonistListProps> = ({ page }) => {
  const [colonistsResult, setColonists] = useState<ColonistResult>({
    colonists: []
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [issuesError, setIssuesError] = useState<Error | null>(null);

  const getData = () => {
    // async/await if failing to produce valid json for some reason?!
    let xhr = new XMLHttpRequest();
    const desiredUrl = `http://localhost:8080/demo/all`;
    xhr.open("GET", desiredUrl);
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== 4) return;
      if (xhr.status === 200) {
        const colonists = JSON.parse(xhr.responseText);

        setColonists({ colonists });
        setIsLoading(false);
      } else {
        setIssuesError(new Error("something went wrong"))
      }
    };
    xhr.send();
  };

  useEffect(() => {
    if (!isLoading) {
      getData();
      setIsLoading(true);
    }
  }, [page, isLoading]);

  const { colonists } = colonistsResult;
  const list = colonists.map(({ name }: Colonist, idx: number) => {
    return <li key={idx}>{name}</li>;
  });

  return (
    <div>
      <ul>{list}</ul>
      {issuesError && <p>{issuesError.message}</p>}
    </div>
  );
};

export default ColonistList;
