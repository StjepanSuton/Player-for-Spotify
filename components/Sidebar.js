import React, { useEffect, useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { playlistIdState } from '../atoms/playlistAtom'
import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon,
} from '@heroicons/react/outline'
import useSpotify from '../hooks/useSpotify'
import { useRecoilState } from 'recoil'

function Sidebar() {
  const spotifyApi = useSpotify()
  const { data: session, status } = useSession()
  const [playlist, setPlaylists] = useState([])
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState)
  useEffect(() => {
    if (session)
      if (spotifyApi.getAccessToken()) {
        spotifyApi
          .getUserPlaylists()
          .then((data) => {
            setPlaylists(data.body.items)
          })
          .catch((err) => console.log(err, 'fired error'))
      }
  }, [session, spotifyApi])

  return (
    <div className="tailwind-scrollbar-hide hidden h-screen overflow-y-scroll border-r border-gray-900 p-5 pb-36 text-sm text-xs text-gray-500 sm:max-w-[12rem] md:inline-flex lg:max-w-[15rem] lg:text-sm">
      <div className="space-y-4">
        <button
          onClick={() => signOut()}
          className="flex items-center space-x-2 hover:text-white"
        >
          <HomeIcon className="h-5 w-5" />
          <p>Home</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <SearchIcon className="h-5 w-5" />
          <p>Search</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <LibraryIcon className="h-5 w-5" />
          <p>Your Library</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />
        {/*/////////////////////////////////////////////////////// */}
        <button className="flex items-center space-x-2 hover:text-white">
          <PlusCircleIcon className="h-5 w-5" />
          <p>Create Playlist</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <HeartIcon className="h-5 w-5" />
          <p>Liked Songs</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <RssIcon className="h-5 w-5" />
          <p>Your episodes</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />
        {playlist.length > 0 ? (
          playlist.map((playlist) => (
            <p
              key={playlist?.id}
              onClick={() => setPlaylistId(playlist?.id)}
              className="cursor-pointer hover:text-white"
            >
              {playlist?.name}
            </p>
          ))
        ) : (
          <p>No playlists...</p>
        )}
      </div>
    </div>
  )
}

export default Sidebar
