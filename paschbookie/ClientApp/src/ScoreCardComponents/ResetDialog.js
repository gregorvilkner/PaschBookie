import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import AutorenewIcon from '@material-ui/icons/Autorenew';

export default function ResetDialog(props) {

    const [open, setOpen] = React.useState(false);

    const [values, setValues] = React.useState({ confirmText: '' })

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        setOpen(false);
        console.log(values.confirmText);
        if (values.confirmText === "1234") {
            props.resetScoreFunction();
        }
    };

    const handleChange = (event) => {
        setValues({ confirmText: event.target.value });
    };

    return (
        <div>
            <Button size="small" aria-label="renew" variant="outlined" style={{ minWidth: '100%', height: 50 }} onClick={handleClickOpen}>
                new game <AutorenewIcon style={{ marginLeft:10}}/>
            </Button >

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Confirm Score Card Reset</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You are about to reset the score on this score card. Enter '1234' to confirm.
          </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="code"
                        type="number"
                        value={values.confirmText}
                        onChange={handleChange}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
          </Button>
                    <Button onClick={handleConfirm} color="primary">
                        Confirm
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}