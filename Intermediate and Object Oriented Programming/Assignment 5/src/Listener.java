import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Font;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.JTextField;

public class Listener extends JFrame {
	JButton reverse;
	JTextField input;
	JTextField output;
	
	
	Listener(){
		this.setSize(300, 300);
		this.getContentPane().setBackground(Color.magenta);
		this.setTitle("My Reversed String");
		Font font = new Font("Times New Roman", Font.PLAIN, 16);
		Font font2 = new Font("Times New Roman", Font.BOLD, 16);
		
		reverse = new JButton("Reverse");
		input = new JTextField("Enter a phrase", 20);
		output = new JTextField(" ", 20);
		
		reverse.setFont(font2);
		input.setFont(font);
		output.setFont(font);
		
		BorderLayout borderLayout = new BorderLayout();
		this.setLayout(borderLayout);
		
		JPanel inputPanel = new JPanel();
		inputPanel.add(input);
		inputPanel.setBackground(Color.magenta);
		this.add(inputPanel, BorderLayout.NORTH);
		
		JPanel outputPanel = new JPanel();
		outputPanel.add(output);
		outputPanel.setBackground(Color.magenta);
		this.add(outputPanel, BorderLayout.CENTER);
		
		JPanel reversePanel = new JPanel();
		reversePanel.add(reverse);
		reversePanel.setBackground(Color.magenta);
		reverse.setBackground(Color.cyan);
		this.add(reversePanel, BorderLayout.SOUTH);
		
		reverse.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent arg0) {
				reverseText();
			}
		});
		
		input.selectAll();
		
		input.addKeyListener(new KeyListener() {

			@Override
			public void keyPressed(KeyEvent arg0) {
				if(arg0.getKeyCode() == KeyEvent.VK_ENTER) {
					reverseText();
				}				
			}

			@Override
			public void keyReleased(KeyEvent arg0) {				
			}

			@Override
			public void keyTyped(KeyEvent arg0) {				
			}
		});
		
		/*input.addActionListener(new ActionListener() {
		public void actionPerformed(ActionEvent arg0) {
			reverseText();
			}
		});*/ //also works when enter key is pressed 
	
		
		this.setVisible(true);
		this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

	}
	
	public void reverseText() {
		String str = input.getText();
		char[] string = str.toCharArray();
		char[] newString = new char[string.length];
		for (int i = 0; i < string.length; i++) {
			newString[i] = string[string.length - 1 - i];
		}
		String reverseString = String.valueOf(newString);
		output.setText(reverseString);
	}
	
	public static void main(String[] args) {
		Listener Frame = new Listener();
		
		
	}

}
