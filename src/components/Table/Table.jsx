<table className="table">
    <thead>
        <tr>
            <th
                className="text-center" scope="col">Image</th>
            <th className="text-center" onClick={this.handleOrder} scope="col"><button className="btn" className="hoverable">Name</button></th>
            <th className="text-center" scope="col">Email</th>
            <th className="text-center" scope="col">Phone</th>
            <th className="text-center" scope="col">DOB</th>
        </tr>
    </thead>
    <tbody>
        {employeesToDisplay.map((item) => (
            <tr>
                <th className="text-center" scope="row"><img src={item.picture} atl="profile picture" /></th>
                <td className="text-center">{item.name} </td>
                <td className="text-center">{item.email}</td>
                <td className="text-center">{item.phone}</td>
                <td >{item.dob}</td>
            </tr>
        ))}
    </tbody>
</table>