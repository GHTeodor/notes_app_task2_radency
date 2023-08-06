import React, {FC} from 'react';
import {Button, TableCell, TableRow} from "@mui/material";

import {useAppSelector} from "../hooks";
import {ArchivedListModal} from "./Modals/ArchivedList";

interface IProps {

}

const SummaryTBody: FC<IProps> = () => {
    const {archived, notes} = useAppSelector(state => state.noteSlice);

    const archivedData = archived.reduce((acc: { [key: string]: number }, {category}) => ({
        ...acc,
        [category]: ++acc[category] || 1,
    }), {});

    const active = (category: string) => notes.filter(n => n.category === category).length;

    const archivedKeys = Object.keys(archivedData);

    return (
        <>
            {archivedKeys.map((archivedKey, i) => <TableRow key={i}>
                <TableCell>{archivedKey}</TableCell>
                <TableCell>{active(archivedKey)}</TableCell>
                <TableCell>
                    <Button variant="text">
                        <ArchivedListModal quantity={archivedData[archivedKey]}/>
                    </Button>
                </TableCell>
            </TableRow>)}
        </>
    );
};

export {SummaryTBody};