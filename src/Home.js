const Home = () => {
  return (
    <div className="home-container">
      <div className="video-container">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/lG1QAyWvKlQ"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <ul>
        <li>
          #1 The first player combines two or more of his or her letters to form
          a word and places it on the board to read either across or down with
          one letter on the center square. Diagonal words are not allowed.
        </li>
        <li>
          #2 Complete your turn by counting and announcing your score for that
          turn. Then draw as many new letters as you played; always keep seven
          letters on your rack, as long as there are enough tiles left in the
          bag.
        </li>
        <li>
          #3 Play passes to the left. The second player, and then each in turn,
          adds one or more letters to those already played to form new words.
          All letters played on a turn must be placed in one row across or down
          the board, to form at least one complete word. If, at the same time,
          they touch others letters in adjacent rows, those must also form
          complete words, crossword fashion, with all such letters. The player
          gets full credit for all words formed or modified on his or her turn.
        </li>
        <li>
          #4 New words may be formed by: Adding one or more letters to a word or
          letters already on the board. Placing a word at right angles to a word
          already on the board. The new word must use one of the letters already
          on the board or must add a letter to it. (See Turns 2, 3 and 4 below.)
          Placing a complete word parallel to a word already played so that
          adjacent letters also form complete words. (See Turn 5 in the Scoring
          Examples section below.)
        </li>
        <li>
          #5 No tile may be shifted or replaced after it has been played and
          scored.
        </li>
        <li>
          {" "}
          #6 Blanks: The two blank tiles may be used as any letters. When
          playing a blank, you must state which letter it represents. It remains
          that letter for the rest of the game.
        </li>
        <li>
          {" "}
          #7 You may use a turn to exchange all, some, or none of the letters.
          To do this, place your discarded letter(s) facedown. Draw the same
          number of letters from the pool, then mix your discarded letter(s)
          into the pool. This ends your turn.
        </li>
        <li>
          {" "}
          #8 Any play may be challenged before the next player starts a turn. If
          the play challenged is unacceptable, the challenged player takes back
          his or her tiles and loses that turn. If the play challenged is
          acceptable, the challenger loses his or her next turn. Consult the
          dictionary for challenges only. All words made in one play are
          challenged simultaneously. If any word is unacceptable, then the
          entire play is unacceptable. Only one turn is lost on any challenge.{" "}
        </li>
        <li>
          #9 The game ends when all letters have been drawn and one player uses
          his or her last letter; or when all possible plays have been made.{" "}
        </li>
      </ul>
    </div>
  );
};

export default Home;
