import React from 'react'
import { useRecoilValue } from 'recoil'
import Song from './Song'
import { playlistIdState, playlistState } from '../atoms/playlistAtom'

function Songs() {
  const playlist = useRecoilValue(playlistState)
  return (
    <div className="flex-col space-y-1 px-8 pb-28 text-white">
      {playlist?.tracks.items &&
        playlist?.tracks.items.map((track, i) => (
          <Song key={track.track.id} track={track} order={i} />
        ))}
    </div>
  )
}

export default Songs
