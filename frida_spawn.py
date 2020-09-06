import frida, sys, re, codecs, time

def on_message(message, data):
    print(message)

if __name__ == '__main__':
	parser = argparse.ArgumentParser(description="[+] antiScreenshot-killer [+]")
	parser.add_argument('-a', required=True, default=None, help='Enter the App name')
	args = vars(parser.parse_args())
	if len(sys.argv) == 1:
		sys.exit("[!] Usage: python "+__file__+".py -a com.test.myApp [!]")
	with codecs.open("./disableFlagSecure.js", 'r', encoding='utf8') as f:
		fridaScript = f.read()
		device = frida.get_usb_device(timeout=5)
		pid = device.spawn([args['a']])
		session = device.attach(pid)
		print("PID Detected: "+str(pid))
		script = session.create_script(fridaScript)
		print ("[+] Intercepting to bypass anti-screenshot ... [+]")
		script.on('message', on_message)
		script.load()
		device.resume(args['a'])
		sys.stdin.read()
