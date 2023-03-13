// TS incorrectly flags function declarations as unused variables
/* eslint-disable no-unused-vars */
import {
    Box,
    Button,
    DialogActions,
    DialogContent,
    Grid,
    Typography,
    Link,
    TextField,
    FormControl,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { HiggsLogo } from '../HiggsLogo';
import { useAPIKeyContext } from '../../contexts/APIKeyContext';
import { MODAL_MODES, SAMPLE_APP_GITHUB_REPOSITORY_URL } from '../../constants';
import { ModalContainer } from '../ModalContainer';

interface APIKeyEntryModalProps {
    isOpen?: boolean;
    initialKey?: string;
}

const APIKeyEntryModal: React.FC<APIKeyEntryModalProps> = ({
    isOpen,
    initialKey,
}) => {
    const [currentAPIKey, setCurrentAPIKey] = useState(initialKey || '');
    const [open, setOpen] = useState(false);

    const { setModalMode, setAPIKey } = useAPIKeyContext();

    const closeModal = () => {
        setModalMode(MODAL_MODES.ENTRY);
        setOpen(false);
    };

    const handleSaveButtonClick = () => {
        setAPIKey(currentAPIKey);
        closeModal();
    };

    useEffect(() => {
        setOpen(isOpen || false);
    }, [isOpen]);

    return (
        <ModalContainer isOpen={open}>
            <Grid item>
                <Box
                    sx={{
                        width: 210,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                    }}
                >
                    <Box sx={{ width: '90px' }}>
                        <HiggsLogo />
                    </Box>
                </Box>
            </Grid>
            <Grid item>
                <Typography variant='h4' align='center'>
                    Welcome to Holy Shirts and Pants!
                </Typography>
            </Grid>
            <Grid item>
                <DialogContent>
                    <Typography variant='body1' align='center'>
                        Holy Shirts and Pants is mParticle’s e-commerce sample
                        app. Everything here is connected to the SDK. Use this
                        app to test drive mParticle and understand how we
                        capture events.
                    </Typography>
                    <Typography variant='body1' align='center'>
                        <Link
                            href={SAMPLE_APP_GITHUB_REPOSITORY_URL}
                            target='_blank'
                        >
                            Learn more at the Git Repo
                        </Link>
                    </Typography>
                </DialogContent>
            </Grid>
            <Grid item>
                <DialogContent>
                    <Typography
                        variant='body1'
                        align='center'
                        sx={{
                            fontSize: '14px',
                            fontWeight: '700',
                            lineHeight: '20px',
                            letterSpacing: '0.13px',
                        }}
                    >
                        To get started, add the web key you generated in
                        mParticle to connect this sample app to your account.
                    </Typography>
                </DialogContent>
            </Grid>
            <Grid item xs={12} sx={{ width: '100%' }}>
                <DialogContent sx={{ py: 0 }}>
                    <FormControl fullWidth focused required>
                        <TextField
                            id='apiKey'
                            // Use inputProps to target for testing because of Material UI's
                            // component abstraction and because we are not using a label
                            // to fetch via getByRole
                            // https://stackoverflow.com/questions/57110557/react-testing-library-the-given-element-does-not-have-a-value-setter-when-firee
                            inputProps={{ 'data-testid': 'apiKey-entry' }}
                            value={currentAPIKey}
                            placeholder='Paste your Key here'
                            onChange={(e) => setCurrentAPIKey(e.target.value)}
                        />
                    </FormControl>
                </DialogContent>
            </Grid>
            <Grid item>
                <DialogActions>
                    <Button
                        disabled={!currentAPIKey}
                        variant='contained'
                        onClick={handleSaveButtonClick}
                        size='large'
                    >
                        Save &amp; Go
                    </Button>
                </DialogActions>
            </Grid>
        </ModalContainer>
    );
};

APIKeyEntryModal.defaultProps = {
    isOpen: false,
    initialKey: undefined,
};

export default APIKeyEntryModal;
