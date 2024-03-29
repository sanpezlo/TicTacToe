import { useState } from 'react'
import Table from '../Table'
import { CheckIcon, XIcon } from '@heroicons/react/outline'

import './styles.css'

const marks = ['X', 'O', 'Y', 'Z']

function PlayOfflineGame({ config }) {
  const [game, setGame] = useState({
    history: [],
    turn: 0,
    finished: false,
  })

  const handleClick = (width, height) => {
    if (game.finished) return

    if (game.history.find((e) => e.width === width && e.height === height))
      return

    let history = game.history
    let turn = game.turn

    history.push({ width, height, mark: marks[turn] })

    const win = checkWin(
      width,
      height,
      config.consecutive,
      history,
      config.width,
      config.height,
      marks[turn]
    )

    if (win) {
      setGame({ ...game, history, finished: true, win: marks[turn] })
    } else if (config.width * config.height === history.length) {
      setGame({ ...game, history, finished: true })
    } else {
      turn++
      if (turn >= config.players) turn = 0
      setGame({ ...game, history, turn })
    }
  }

  return (
    <>
      <div className="main-item">
        <div className="play-offline">
          <Table
            width={config.width}
            height={config.height}
            handleClick={handleClick}
            history={game.history}
          />
        </div>

        <ul className="table-items">
          <li className="item-model">
            Width <span className="value-item">{config.width}</span>
          </li>
          <li className="item-model">
            Height <span className="value-item">{config.height}</span>
          </li>
          <li className="item-model">
            Consecutive <span className="value-item">{config.consecutive}</span>
          </li>
          <li className="item-model">
            Inverted{' '}
            <span className="value-item">
              {config.inverted ? (
                <CheckIcon className="check-icon" />
              ) : (
                <XIcon className="none-icon" />
              )}
            </span>
          </li>
          <li className="item-model">
            Players <span className="value-item">{config.players}</span>
          </li>
        </ul>

        {game.win ? (
          config.inverted ? (
            <div className="table-model">
              <div>Lose</div>
              <div>{game.win}</div>
            </div>
          ) : (
            <div className="table-model">
              <div>Win</div>
              <div>{game.win}</div>
            </div>
          )
        ) : (
          <></>
        )}
      </div>
    </>
  )
}

const checkWin = (x, y, consecutive, history, width, height, mark) => {
  let consecutive_mark = 0

  for (let i = 1; i < consecutive; i++) {
    if (
      history.find(
        (e) => e.height === y && e.width === x + i && `${e.mark}` === `${mark}`
      )
    ) {
      consecutive_mark++
    } else break
  }

  if (consecutive_mark >= consecutive - 1) return true

  for (let i = 1; i < consecutive; i++) {
    if (
      history.find(
        (e) => e.height === y && e.width === x - i && `${e.mark}` === `${mark}`
      )
    ) {
      consecutive_mark++
    } else break
  }

  if (consecutive_mark >= consecutive - 1) return true

  consecutive_mark = 0

  for (let i = 1; i < consecutive; i++) {
    if (
      history.find(
        (e) => e.height === y - i && e.width === x && `${e.mark}` === `${mark}`
      )
    ) {
      consecutive_mark++
    } else break
  }

  if (consecutive_mark >= consecutive - 1) return true

  for (let i = 1; i < consecutive; i++) {
    if (
      history.find(
        (e) => e.height === y + i && e.width === x && `${e.mark}` === `${mark}`
      )
    ) {
      consecutive_mark++
    } else break
  }

  if (consecutive_mark >= consecutive - 1) return true

  consecutive_mark = 0

  for (let i = 1; i < consecutive; i++) {
    if (
      history.find(
        (e) =>
          e.height === y + i && e.width === x + i && `${e.mark}` === `${mark}`
      )
    ) {
      consecutive_mark++
    } else break
  }

  if (consecutive_mark >= consecutive - 1) return true

  for (let i = 1; i < consecutive; i++) {
    if (
      history.find(
        (e) =>
          e.height === y - i && e.width === x - i && `${e.mark}` === `${mark}`
      )
    ) {
      consecutive_mark++
    } else break
  }

  if (consecutive_mark >= consecutive - 1) return true

  consecutive_mark = 0

  for (let i = 1; i < consecutive; i++) {
    if (
      history.find(
        (e) =>
          e.height === y + i && e.width === x - i && `${e.mark}` === `${mark}`
      )
    ) {
      consecutive_mark++
    } else break
  }

  if (consecutive_mark >= consecutive - 1) return true

  for (let i = 1; i < consecutive; i++) {
    if (
      history.find(
        (e) =>
          e.height === y - i && e.width === x + i && `${e.mark}` === `${mark}`
      )
    ) {
      consecutive_mark++
    } else break
  }

  if (consecutive_mark >= consecutive - 1) return true

  return false
}

export default PlayOfflineGame
