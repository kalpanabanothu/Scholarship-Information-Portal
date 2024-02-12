import React, { useState, useEffect } from "react";
import axios from "axios";
import Papa from 'papaparse';
import Scholarships from './scholarships.csv';
import './onlinescholarship.css';
import NavBar from '../components/navbar'


function OnlineScholarships() {
    const [csvData, setCsvData] = useState([]);
    const [header, setHeader] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedState, setSelectedState] = useState("All");



    const papaConfig = {
        complete: (results, file) => {
            setHeader(results.data[0]);
            const dataWithoutHeader = results.data.slice(1);
            setCsvData(dataWithoutHeader);
        },
        download: true,
        error: (error, file) => {
            console.log('Error while parsing:', error, file);
        },
    };

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const response = await axios.post("http://localhost:5000/fetch");
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
        Papa.parse(Scholarships, papaConfig);
        setLoading(false);
    }, []);

    const filteredScholarships = selectedState === "All"
        ? csvData
        : csvData.filter(row => row[0].toLowerCase().includes(selectedState.toLowerCase()));


    return (
        <div>
            <NavBar /> {loading ? <h1>Loading</h1> : <>
                <label htmlFor="stateDropdown">Select State: </label>
                <select
                    id="stateDropdown"
                    onChange={(e) => setSelectedState(e.target.value)}
                    value={selectedState}
                >
                    <option value="All">All</option>
                    <option value="Assam">Assam</option>
                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                    <option value="Andaman">Andaman</option>
                    <option value="Chandigarh">Chandigarh</option>
                    <option value="CHATTISGARH">Chhattisgarh</option>
                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                    <option value="Ladakh">Ladakh</option>
                    <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                    <option value="Goa">Goa</option>
                    <option value="Lakshadweep">Lakshadweep</option>
                    <option value="Manipur">Manipur</option>
                    <option value="Meghalaya">Meghalaya</option>
                    <option value="Mizoram">Mizoram</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Puducherry">Puducherry</option>
                    <option value="Sikkim">Sikkim</option>
                    <option value="Tripura">Tripura</option>
                    <option value="Telengana">Telengana</option>
                    <option value="Uttarakhand">Uttarakhand</option>

                </select>

                {/* Display scholarships based on the selected state */}
                <table className="scholarship-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Guidelines</th>
                            <th>FAQ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredScholarships.length != 0 && (
                            filteredScholarships.map((row, index) => (
                                <tr key={index}>
                                    <td>{row[0]}</td>
                                    <td>{row[1]}</td>
                                    <td>
                                        {row[5] && (
                                            <a
                                                href={row[5]}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="link"
                                            >
                                                Guidelines
                                            </a>
                                        )}
                                    </td>
                                    <td>
                                        {row[6] && (
                                            <a
                                                href={row[6]}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="link"
                                            >
                                                FAQ
                                            </a>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}

                        {filteredScholarships.length == 0 && (<h4 className="nosch">No scholarships available right now for  {selectedState}.</h4>)}
                    </tbody>
                </table>

            </>}

        </div>
    );

}


export default OnlineScholarships;
