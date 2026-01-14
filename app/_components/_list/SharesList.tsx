"use client";

import { SHARE_TYPE } from '@/app/_types/types';
import React from 'react'
import CardPhoto from '../_cards/CardPhoto';
import CardFolder from '../_cards/CardFolder';
import CardNote from '../_cards/CardNote';

type Props = {
    shares: SHARE_TYPE[]
    state: string
}
const SharesList = ({ shares, state }: Props) => {
    return (
        <div className='flex flex-row gap-5 flex-wrap mx-auto px-2 py-2'>
            {
                shares.map((share: SHARE_TYPE) => {
                    if (share.state !== state) {
                        return null; // Or omit entirely with .filter() for better perf
                    }
                    switch (state) {
                        case "Note":
                            return <CardNote key={share._id} note={share?.share} />
                        case "Folder":
                            return <CardFolder key={share._id} folder={share?.share} />
                        case "Photo":
                            return <CardPhoto key={share._id} photo={share?.share} />

                    }
                })
            }
        </div>
    )
}

export default SharesList