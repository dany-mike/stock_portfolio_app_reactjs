import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Container } from '@material-ui/core';
import styles from './WalletPage.module.css'
import { WalletContentByWalletId } from '../../services/walletService'
import {useEffect, useState} from 'react'
import { useParams, useHistory } from 'react-router-dom'
import CompanyList from '../../components/CompanyList/CompanyList'


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function WalletPage() {

    const [walletContent, setWalletContent] = useState([])

    const history = useHistory()
    const { username } = useParams()
    const { walletId } = useParams()

    useEffect(() => {
        (async () => {
            try {
                setWalletContent(await WalletContentByWalletId(username, walletId))
            } catch(err) {
                history.push('/signin')
            }
        })()
    }, [username, walletId, history])

    const classes = useStyles();

    return (
        <Container className={styles.marginTop}>
            <TableContainer component={Paper} variant="outlined">
                <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                    <TableCell>Company</TableCell>
                    <TableCell>Symbol</TableCell>
                    <TableCell>Stock Price(now)</TableCell>
                    <TableCell>Stock Price(forecast 1y)</TableCell>
                    <TableCell>Shares Number</TableCell>
                    <TableCell>Activity Area</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <CompanyList datas={walletContent}/>
                </TableBody>
                </Table>
            </TableContainer>
        </Container>

    )
}
