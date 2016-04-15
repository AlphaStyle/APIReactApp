package websocket

import (
	"io"
	"log"
	"net/http"

	"golang.org/x/net/websocket"
)

// A Map with all the connectins to the websocket
type Brodcasting struct {
	Ws map[*websocket.Conn]bool
}

// Echo the data received on the WebSocket.
func (brod *Brodcasting) EchoServer(ws *websocket.Conn) {
	r := ws.Request()
	log.Printf("%s Connected \n", r.Host)
	brod.Ws[ws] = true

	// If there is a request connection, continue the loop
	for r != nil {
		// Getting the Received message
		var message string
		err := websocket.Message.Receive(ws, &message)
		if err != nil {
			log.Printf("Received Error: %s \n", err)
			break
			if err == io.EOF {
				log.Println("EOF Error \n")
				break
			}
		}

		// If the length of the message is more than 0,
		// than proceed to echo the message to all connections
		if len(message) > 0 {
			log.Printf("\n message: %s \n length: %v | from %s \n", message, len(message), r.Host)
			// Sending message to all connections
			for key := range brod.Ws {
				err := websocket.Message.Send(key, message)
				if err != nil {
					key.Close()
					delete(brod.Ws, key)
					log.Printf("Sending Error: %s \n", err)
					log.Printf("%v \n", brod.Ws)
					continue
				}
			}
		}

	}

}

func main() {
	brod := Brodcasting{make(map[*websocket.Conn]bool)}
	go http.Handle("/ws", websocket.Handler(brod.EchoServer))
	err := http.ListenAndServe(":9000", nil)
	if err != nil {
		panic("ListenAndServe: \n" + err.Error())
	}
}
