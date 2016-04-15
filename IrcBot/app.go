package main

import (
	"bufio"
	"fmt"
	"io/ioutil"
	"log"
	"net"
	"os"
	"strings"
	"unicode"

	"golang.org/x/net/websocket" 
)

// Irc struct has all the IRC Server Details
type Irc struct {
	Port   string
	Server string
	Pass   string
	Nick   string
}

func getTwitchChatInfo() *Irc {
	// Open the file to get Token.
	tokenFile, err := os.Open("token.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer tokenFile.Close()

	// Read the file to get token.
	fileData, err := ioutil.ReadAll(tokenFile)
	if err != nil {
		log.Fatal(err)
	}

	// Convert bytes to string.
	len := len(fileData)
	token := string(fileData[:len])
	if token == "" {
		log.Fatal("Token File is Empty")
	} else {
		// Create IRC Struct with all data
		irc := &Irc{
			Port:   "6667",
			Server: "irc.twitch.tv",
			Pass:   token,
			Nick:   "mrtbstyle",
		}
		return irc
	}
	return nil
}

func connectToWebsocket() *websocket.Conn {
	// Connecting to the Websocket
	origin := "http://localhost/"
	url := "ws://localhost:9000/ws"
	ws, err := websocket.Dial(url, "", origin)
	if err != nil {
		log.Fatal(err)
	}
	// Return the Websocket Connection
	return ws
}

func connectToTwitchChat(irc *Irc, ws *websocket.Conn) {
	// Connecting to the Twitch IRC Servers
	conn, err := net.Dial("tcp", irc.Server+":"+irc.Port)
	if err != nil {
		fmt.Printf("Cant connect to server: %s \n", err)
	}

	// Loging in with Token and Username.
	// Joining your own channel
	fmt.Fprintf(conn, "PASS "+irc.Pass+"\r\n")
	fmt.Fprintf(conn, "NICK "+irc.Nick+"\r\n")
	fmt.Fprintf(conn, "JOIN #"+irc.Nick+"\r\n")

	// Getting the messages
	ircData := bufio.NewScanner(conn)
	for ircData.Scan() {
		messages := ircData.Text()
		fmt.Println(messages)
		if messages == "PING :tmi.twitch.tv" {
			fmt.Fprintf(conn, "PONG :tmi.twitch.tv\r\n")
			fmt.Println("PONG")
		} else {

			// Filtering the Data to get username and message
			filter := func(c rune) bool {
				return !unicode.IsLetter(c) && !unicode.IsNumber(c)
			}
			filteredIrcData := strings.FieldsFunc(messages, filter)
			if len(filteredIrcData) > 8 {
				message := strings.Join(filteredIrcData[8:], " ")
				username := filteredIrcData[0]

				// Sending messages to websocket
				if filteredIrcData[6] == "PRIVMSG" {
					_, err := ws.Write([]byte(username + ": " + message + "\n"))
					if err != nil {
						log.Fatal(err)
					}
				} else {
					continue
				}
			}
		}
		err = ircData.Err()
		if err != nil {
			log.Fatal(err)
		}
	}
}

// Read Received Messages from Websocket
func reciveMessageFromWebsocket(ws *websocket.Conn) {
	for {
		var message string
		err := websocket.Message.Receive(ws, &message)
		if err != nil {
			log.Printf("Received Error: %s \n", err)
			break
		}
		fmt.Printf("Received: %s \n", message)
	}
}

func main() {
	ws := connectToWebsocket()
	ircDetails := getTwitchChatInfo()
	go connectToTwitchChat(ircDetails, ws)
	reciveMessageFromWebsocket(ws)
}
