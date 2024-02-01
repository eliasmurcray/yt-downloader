const fs = require("node:fs");
const ytdl = require("ytdl-core");

if (fs.existsSync("data.txt")) {
	if (!fs.existsSync("downloads/")) fs.mkdirSync("downloads");
	const options = {
		filter: format => format.container === "mp4",
		quality: "highestaudio",
		dlChunkSize: 0
	};

	const data = fs.readFileSync("data.txt", "utf-8");
	data.split("\n").forEach((line, i) => {
		if (!line.trim().length) return;
		const [url, title] = line.split(" ");
		ytdl(url, options).pipe(fs.createWriteStream("downloads/" + (title || `download_${i}`) + ".mp4"));
	});
}
