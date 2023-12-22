import CircuitCSS from './Circuit.module.css'
import players from './players'

function Circuit() {
  return (
    <div className={CircuitCSS.parent}>
        <h3 className={`${CircuitCSS.header} ${CircuitCSS.title}`}>Welcome to the <span style={{color: 'var(--primary)'}}>Savage Circuit!</span></h3>
        <p>
            Compete in monthly online tournament circuit for <span style={{color: 'var(--primary)', fontWeight: 'bold'}}>CASH PRIZES</span> and <span style={{color: 'var(--primary)', fontWeight: 'bold'}}>SAVAGE POINTS!</span> <a href=""><span style={{textDecoration: 'underline', color: 'white'}}>View Details</span></a>
            
            {/* <br/><br/>
            <a href=""><span style={{color: 'var(--primary)', fontWeight: 'bold', textDecoration: 'underline'}}>Click Here</span></a> for more info. */}
        </p>

        <button className={CircuitCSS.signUpButton}>Sign Up Now!</button>

        <h4 className={CircuitCSS.header}> - January Tournament Signups - </h4>

        <div className={CircuitCSS.signUpCount}>Live Signup Count: 59/64</div>

        <div className={CircuitCSS.playerSignups}>
            {players.map(player => {
                return <div key={player}>{player}</div>
            })}
        </div>
    </div>
  )
}
export default Circuit