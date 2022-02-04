import { ChevronDoubleDownIcon } from '@heroicons/react/outline'
import { useSession, signOut } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { shuffle } from 'lodash'

import { playlistIdState, playlistState } from '../atoms/playlistAtom'
import { useRecoilValue, useRecoilState } from 'recoil'
import useSpotify from '../hooks/useSpotify'
import Songs from '../components/Songs'
const colors = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500',
]

function Center() {
  const { data: session } = useSession()
  const spotifyApi = useSpotify()
  const [color, setColor] = useState(null)
  const playlistId = useRecoilValue(playlistIdState)
  const [playlist, setPlaylist] = useRecoilState(playlistState)

  useEffect(() => {
    setColor(shuffle(colors).pop())
  }, [playlistId])

  useEffect(() => {
    if (session)
      spotifyApi
        .getPlaylist(playlistId)
        .then((data) => {
          setPlaylist(data.body)
        })
        .catch((err) => console.log(err, 'center'))
  }, [spotifyApi, playlistId, session])

  return (
    <div className="h-screen flex-grow overflow-y-scroll text-white scrollbar-hide">
      <header className="absolute top-5 right-8">
        <div
          onClick={() => signOut()}
          className=" flex cursor-pointer items-center space-x-3 rounded-full bg-black p-2.5 pr-2 opacity-90 hover:opacity-80"
        >
          {session?.user.image && (
            <img
              className="h-10 w-10 rounded-full"
              src={session?.user.image}
              alt=""
            />
          )}
          <h2>{session?.user.name}</h2>
          <ChevronDoubleDownIcon className="h-5 w-5" />
        </div>
      </header>
      <section
        className={` flex h-80 items-end space-x-7 bg-gradient-to-b ${color} to-black p-8 text-white`}
      >
        <img
          className="h-44 w-44 shadow-2xl"
          src={playlist?.images?.[0]?.url}
        />
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl font-bold md:text-3xl xl:text-5xl">
            {playlist?.name}
          </h1>
        </div>
      </section>
      <Songs />
    </div>
  )
}

export default Center
