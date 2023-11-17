// import { Chart } from "@mongodb-js/charts-embed-dom";
import Dashboard from "../Dashboard";
import { Helmet } from "react-helmet";

function Map() {
    return (
        <div className="Map">
            <Helmet>
                <title>My Map</title>
                <link rel="canonical" href="http://example.com" />
                <meta name="description" content="My app description" />
                <meta http-equiv='cache-control' content='no-cache' />
                <meta http-equiv='expires' content='0' />
                <meta http-equiv='pragma' content='no-cache' />
            </Helmet>
            <Dashboard />
        </div>
    )
}

export default Map;