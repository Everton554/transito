import React from 'react';

export default function StoryScreen({
  title,
  text,
  buttonText,
  onContinue
}) {
  return (
    <div className="screen">

      <div className="story-card">

        <div className="story-label">
          ROTA SEGURA
        </div>

        <h1>{title}</h1>

        <div className="story-text">
          {text}
        </div>

        <button onClick={onContinue}>
          {buttonText}
        </button>

      </div>

    </div>
  );
}