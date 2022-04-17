CREATE TABLE games (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	gameName VARCHAR(50) NOT NULL,
	platform VARCHAR(50) NOT NULL,
	developer VARCHAR(50) NOT NULL,
	price VARCHAR(50) NOT NULL
);

INSERT INTO games (gameName, platform, developer, price) VALUES (
	"seis", "dos", "tres", "cuadro"
);
