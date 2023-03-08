export const Loading = () => {
    return(
        <div className="container-fluid d-flex justify-content-center align-items-center" style={{height: 100 + 'vh'}}>
            <div className="spinner-border m-5" style={{width: 3 + 'rem', height: 3 + 'rem'}} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}