import { useEffect, useRef, useState } from "react";
import Loading from "./Loading";

function Result(props) {
  const ref = useRef(null);

  const [results, setResults] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + props.search)
      .then((data) => data.json())
      .then((data) => {
        setResults(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(true);
      });
  }, [props.search]);

  function answer() {
    if (!isLoading && results && !results.title) {
      let result = results[0];
      function playAudio() {
        const audio = ref.current;
        audio.src === "http://localhost:5173/"
          ? alert("No audio found")
          : audio.play();
      }

      const checkPhonetics =
        result.phonetics.length === 0
          ? false
          : !result.phonetics
              .map((item) => item.audio)
              .every((item) => item === "");
      const audio = checkPhonetics
        ? result.phonetics.filter((item) => item.audio !== "")[0].audio
        : "";

      const phonetic = result.phonetics[0]
        ? result.phonetics.filter((item) => item.text !== "")[0].text
        : "";

      const meanings = result.meanings.map((item, key) => {
        return (
          <div key={key}>
            <div className="noun">
              <b>{item.partOfSpeech}</b> <hr />
            </div>
            <p className="gray">meaning</p>
            <ul>
              {item.definitions.map((items, key) => (
                <li key={key}>{items.definition}</li>
              ))}
            </ul>
            <div className="flex">
              {item.synonyms[0] && <p className="gray">synonyms</p>}
              {item.synonyms[0] && (
                <p className="syn">
                  {item.synonyms.map((items, indx) => {
                    return (
                      <span key={indx} className="span">
                        {item.synonyms.length - 1 === indx
                          ? items
                          : `${items},`}
                      </span>
                    );
                  })}
                </p>
              )}
            </div>
            <div className="flex">
              {item.antonyms[0] && <p className="gray">antonyms</p>}
              {item.antonyms[0] && (
                <p className="syn">
                  {item.antonyms.map((items, indx) => {
                    return (
                      <span key={indx} className="span">
                        {item.antonyms.length - 1 === indx
                          ? items
                          : `${items},`}
                      </span>
                    );
                  })}
                </p>
              )}
            </div>
          </div>
        );
      });

      return (
        <div className="result">
          <div className="word">
            <div>
              <h1 className="h1">{result.word}</h1>
              <p className="p1">{result.phonetic}</p>
            </div>
            <div className="play">
              <audio ref={ref} id="audio" src={audio}></audio>
              <i className="fa-solid fa-circle-play" onClick={playAudio}></i>
            </div>
          </div>
          {meanings}
          <hr />
          <div className="flex">
            <p className="gray">source</p>
            <a href={result.sourceUrls}>{result.sourceUrls}</a>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h1>{results.title}</h1>
          <h2>{results.message}</h2>
          <h3>{results.resolution}</h3>
        </div>
      );
    }
  }

  const answers = answer();

  return <>{isLoading ? <Loading /> : answers}</>;
}

export default Result;
