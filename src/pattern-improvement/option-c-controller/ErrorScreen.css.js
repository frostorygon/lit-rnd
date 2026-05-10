import { css } from 'lit';

export const errorScreenStyles = css`
  :host {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 32px 24px;
    font-family: system-ui, -apple-system, sans-serif;
    min-height: 400px;
  }

  lottie-player {
    width: var(--error-animation-size, 160px);
    flex: 0;
  }

  h1 {
    font-size: 19px;
    font-weight: 700;
    width: 100%;
    margin: 16px 0 0;
  }

  p {
    font-size: 16px;
    margin: 8px 0 0;
    color: #555;
  }

  app-notification {
    margin-top: 24px;
    width: 100%;
    text-align: left;
  }

  app-button {
    margin-top: auto;
    width: 100%;
  }

  contact-popover {
    margin-top: auto;
    width: 100%;
  }
`;
