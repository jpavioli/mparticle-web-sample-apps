import React, { useReducer, useState, useEffect } from 'react';
import {
    Grid,
    Typography,
    Button,
    Box,
    FormControl,
    TextField,
    Checkbox,
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import mParticle from '@mparticle/web-sdk';
import { useOrderDetails } from '../../contexts/OrderDetails';
import OrderDetailsTotals from './OrderDetailsTotals';
import { ORDER_PHASES, OrderPhaseTypes } from '../../constants';
import OrderDetailsCard from './OrderDetailsCard';

const { v4: uuid } = require('uuid');

interface OrderDetailsPurchaseReviewProps {
    setOrderPhase: React.Dispatch<React.SetStateAction<OrderPhaseTypes>>;
}

const OrderDetailsPurchaseReview: React.FC<OrderDetailsPurchaseReviewProps> = ({
    setOrderPhase,
}) => {
    const { items, subTotal, salesTax, shippingCost, grandTotal, resetCart } =
        useOrderDetails();

    const user = mParticle.Identity.getCurrentUser();

    const [formInput, setFormInput] = useReducer(
        (state: any, newState: any) => ({ ...state, ...newState }),
        {
            emailAddress: user.getUserIdentities().userIdentities.email,
            ccpa: user.getConsentState().getCCPAConsentState().Consented
                ? 'on'
                : 'off',
            ...user.getAllUserAttributes(),
        },
    );
    const [formValid, setFormValid] = useState(false);

    const handleInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = evt.target;
        setFormInput({ [id]: value });
    };

    useEffect(() => {
        // Listens for product, size or color change so that
        // the 'Add To Cart' Butten can be enabled/disabled
        // if the product has variants that have not been selected
        let isValid = true;

        if (formInput && !formInput.emailAddress) {
            isValid = false;
        }
        if (formInput && !(formInput.firstName || formInput.$firstName)) {
            isValid = false;
        }
        if (formInput && !(formInput.lastName || formInput.$lastName)) {
            isValid = false;
        }
        if (formInput && !(formInput.address || formInput.$address)) {
            isValid = false;
        }
        if (formInput && !(formInput.city || formInput.$address)) {
            isValid = false;
        }
        if (formInput && !(formInput.state || formInput.$state)) {
            isValid = false;
        }
        if (formInput && !(formInput.zip || formInput.$zip)) {
            isValid = false;
        }
        setFormValid(isValid);
    }, [formInput]);

    const handleOrderComplete = () => {
        const identityRequest = {
            userIdentities: {
                email: formInput.emailAddress,
                customerid:
                    user.getUserIdentities().userIdentities.customerid ||
                    uuid().toString(),
            },
        };

        const identityCallback = (result: any) => {
            const userResult = result.getUser();

            if (userResult) {
                // Add User Attributes
                const reservedUAs = [
                    'firstName',
                    'lastName',
                    'address',
                    'city',
                    'state',
                    'zip',
                ];

                Object.keys(formInput).forEach((key) => {
                    if (reservedUAs.includes(key)) {
                        user.setUserAttribute(`$${key}`, formInput[key]);
                    }
                });

                // Add Consent to Profile
                if (formInput.ccpa === 'on') {
                    const consentState = mParticle.Consent.createConsentState();
                    const ccpaConsentState =
                        mParticle.Consent.createCCPAConsent(
                            true, // true represents a "data sale opt-out", false represents the user declining a "data sale opt-out"
                            Date.now(), // Timestamp
                            'ccpa_agreement_v1', // Document
                            `WEB:${mParticle.getDeviceId()}`, // Location
                            mParticle.getDeviceId(), // Hardware ID
                        );
                    consentState.setCCPAConsentState(ccpaConsentState); // Note that *purpose* is not required here, unlike in GDPR above where it is required
                    user.setConsentState(consentState);
                }

                return;
            }

            const codes = window.mParticle.Identity.HTTPCodes;
            switch (result.httpCode) {
                case codes.noHttpCoverage:
                    // retry the IDSync request
                    break;
                case codes.activeIdentityRequest:
                case 429:
                    // inspect your implementation if this occurs frequency
                    // otherwise retry the IDSync request
                    break;
                case codes.validationIssue:
                case 400:
                    // inspect result.body to determine why the request failed
                    // this typically means an implementation issue
                    break;
                default:
                // default statement
            }
        };

        if (
            formInput &&
            !!formInput.emailAddress &&
            !user.getUserIdentities().userIdentities.email
        ) {
            // CONVERT FROM UNKNOWN TO KNOWN USER
            mParticle.Identity.login(identityRequest, identityCallback);
        } else {
            // Email address must be present
        }

        // PROCESS THE PURCHASE EVENT
        const mParticleProducts = Object.keys(items).map((item) => {
            const { product, quantity, variants } = items[item];

            const color = variants?.color;
            const size = variants?.size;

            return mParticle.eCommerce.createProduct(
                product.label,
                product.id,
                product.price,
                quantity,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                { color, size },
            );
        });

        // These attributes are optional and can be ignored. They are being listed here
        // for clarity.
        // Custom Attributes are used to add additional transactional data to your
        // product actions, such as sales or conversion campaign identifiers
        const customAttributes: mParticle.SDKEventAttrs = {};

        // Custom Flags are used to pass configuration options to forwarders and kits
        // For more details: https://docs.mparticle.com/developers/sdk/web/event-tracking/#custom-flags
        const customFlags: mParticle.SDKEventCustomFlags = {};

        // Transaction Attributes are used mostly for when a transaction is complete
        // This is optional but requires a transaction ID if you plan on sending this.
        //
        // Depending on your use case, your transaction ID can be any unique
        // identifier for a completed transaction. In this example we are simply
        // generating a string based on Epoch for demonstration purposes
        const transactionAttributes: mParticle.TransactionAttributes = {
            Id: `${Date.now()}`, // Using Epoch for demonstration purposes
            Revenue: grandTotal,
            Tax: salesTax,
        };

        mParticle.eCommerce.logProductAction(
            mParticle.ProductActionType.Purchase,
            mParticleProducts,
            customAttributes,
            customFlags,
            transactionAttributes,
        );

        resetCart();
        setOrderPhase(ORDER_PHASES.COMPLETE);
    };

    return (
        <>
            <Box
                sx={{
                    my: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Button
                    variant='text'
                    color='primary'
                    startIcon={<ArrowBackIosIcon />}
                    onClick={() => setOrderPhase(ORDER_PHASES.IN_PROGRESS)}
                >
                    Back to Cart
                </Button>
                <Typography variant='h3'>Checkout</Typography>
            </Box>
            <form onSubmit={handleOrderComplete}>
                <Grid
                    container
                    rowSpacing={2}
                    columns={1}
                    direction='column'
                    alignItems='center'
                    justifyContent='center'
                    sx={{
                        my: 5,
                    }}
                >
                    <Grid
                        item
                        xs={12}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography variant='h6' sx={{ pb: 2 }}>
                            Shipping *
                        </Typography>
                        <Typography variant='caption'>
                            * Demonstration Only
                        </Typography>

                        <Box sx={{ my: 2 }}>
                            <FormControl sx={{ mr: 1 }}>
                                <TextField
                                    id='firstName'
                                    label='First Name'
                                    defaultValue={
                                        formInput.firstName ||
                                        formInput.$firstName
                                    }
                                    onChange={handleInput}
                                />
                            </FormControl>
                            <FormControl sx={{ ml: 1 }}>
                                <TextField
                                    id='lastName'
                                    label='Last Name'
                                    defaultValue={
                                        formInput.lastName ||
                                        formInput.$lastName
                                    }
                                    onChange={handleInput}
                                />
                            </FormControl>
                        </Box>
                        <FormControl fullWidth sx={{ my: 2 }}>
                            <TextField
                                id='emailAddress'
                                label='Email Address'
                                defaultValue={formInput.emailAddress}
                                onChange={handleInput}
                            />
                        </FormControl>
                        <FormControl fullWidth sx={{ my: 2 }}>
                            <TextField
                                id='address'
                                label='Street Address'
                                defaultValue={
                                    formInput.address || formInput.$address
                                }
                                onChange={handleInput}
                            />
                        </FormControl>
                        <FormControl fullWidth sx={{ my: 2 }}>
                            <TextField
                                id='city'
                                label='City'
                                defaultValue={formInput.city || formInput.$city}
                                onChange={handleInput}
                            />
                        </FormControl>
                        <Box sx={{ my: 2 }}>
                            <FormControl sx={{ mr: 1 }}>
                                <TextField
                                    id='state'
                                    label='State'
                                    defaultValue={
                                        formInput.state || formInput.$state
                                    }
                                    onChange={handleInput}
                                />
                            </FormControl>
                            <FormControl sx={{ ml: 1 }}>
                                <TextField
                                    id='zip'
                                    label='Zip'
                                    defaultValue={
                                        formInput.zip || formInput.$zip
                                    }
                                    onChange={handleInput}
                                />
                            </FormControl>
                        </Box>
                        <Box sx={{ my: 2 }}>
                            <FormControl sx={{ ml: 1 }}>
                                <Checkbox
                                    id='ccpa'
                                    checked={formInput.ccpa === 'on'}
                                    onChange={handleInput}
                                    style={{ height: 25, width: 25 }}
                                />
                            </FormControl>
                            <FormControl sx={{ ml: 1 }}>
                                <Typography variant='body1'>
                                    I wish to share my data for a robust user
                                    experience
                                </Typography>
                            </FormControl>
                        </Box>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography variant='h6' sx={{ pb: 2 }}>
                            Payment *
                        </Typography>
                        <Typography variant='caption'>
                            * Demonstration Only
                        </Typography>
                        <FormControl fullWidth sx={{ my: 2 }}>
                            <TextField
                                id='cardNumber'
                                label='Credit Card Number'
                                defaultValue='0000-0000-0000'
                            />
                        </FormControl>
                        <Box sx={{ my: 2 }}>
                            <FormControl sx={{ mr: 1 }}>
                                <TextField
                                    id='expiration'
                                    label='Expiration'
                                    defaultValue='3/23'
                                />
                            </FormControl>
                            <FormControl sx={{ ml: 1 }}>
                                <TextField
                                    id='cvc'
                                    label='CVC'
                                    defaultValue='227'
                                />
                            </FormControl>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant='h6'>Review Order *</Typography>
                    </Grid>

                    {Object.keys(items).map((item) => {
                        const { product, variants, quantity, totalAmount } =
                            items[item];
                        return (
                            <Grid item key={item}>
                                <OrderDetailsCard
                                    productAttributes={{
                                        id: item,
                                        sku: product.id,
                                        label: product.label,
                                        altText: product.label,
                                        imageUrl: product.imageUrl,
                                        quantity,
                                        price: product.price,
                                        total: totalAmount,
                                        color: variants?.color,
                                        size: variants?.size,
                                    }}
                                />
                            </Grid>
                        );
                    })}

                    <OrderDetailsTotals
                        subTotal={subTotal}
                        salesTax={salesTax}
                        shippingCost={shippingCost}
                        grandTotal={grandTotal}
                    />

                    <Grid item>
                        <Button
                            variant='contained'
                            fullWidth
                            size='large'
                            onClick={handleOrderComplete}
                            disabled={!formValid}
                        >
                            Place Order *
                        </Button>
                    </Grid>
                    <Grid item>
                        <Typography variant='caption'>
                            * Demonstration Only
                        </Typography>
                    </Grid>
                </Grid>
            </form>
        </>
    );
};

export default OrderDetailsPurchaseReview;
