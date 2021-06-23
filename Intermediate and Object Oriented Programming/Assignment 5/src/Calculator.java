import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Font;
import java.awt.GridLayout;
import java.awt.event.ActionListener;
import java.awt.event.ActionEvent;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JTextField;

public class Calculator extends JFrame{
	JTextField input1;
	JTextField input2;
	JLabel F1;
	JLabel F2;
	JLabel outputValue;
	JLabel output;
	JButton add;
	JButton subtract;
	JButton multiply;
	JButton divide;
	JButton F1Copy;
	JButton F2Copy;
	JButton quit;
	
	Calculator() {
		this.setSize(400, 500);
		this.getContentPane().setBackground(Color.lightGray);
		this.setTitle("My Calculator");
		Font font = new Font("Serif", Font.ITALIC, 15);
		Font font2 = new Font("Verdana", Font.PLAIN, 16);

		outputValue = new JLabel(" ");
		output = new JLabel("Output: ");
		F1 = new JLabel("F1");
		F2 = new JLabel("F2");
		input1 = new JTextField("Enter a number", 20);
		input2 = new JTextField("Enter a number", 20);
		add = new JButton("+");
		subtract = new JButton("-");
		multiply = new JButton("*");
		divide = new JButton("/");
		F1Copy = new JButton("Result to F1");
		F2Copy = new JButton("Result to F2");
		quit = new JButton("Quit");
		
		input1.setFont(font);
		input2.setFont(font);
		outputValue.setFont(font);
		output.setFont(font2);
		F1.setFont(font2);
		F2.setFont(font2);
		add.setFont(font2);
		subtract.setFont(font2);
		multiply.setFont(font2);
		divide.setFont(font2);
		F1Copy.setFont(font2);
		F2Copy.setFont(font2);
		quit.setFont(font2);
		

		add.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent arg0) {
				if(input1.getText().equals("Enter a number") || input2.getText().equals("Enter a number")) {
					outputValue.setText("ERROR: Input is empty/invalid");
					return;
				}
				String num1 = input1.getText();
				String num2 = input2.getText();
				double value1 = Double.parseDouble(num1);
				double value2 = Double.parseDouble(num2);
				double add = value1 + value2;
				String answer = String.valueOf(add);
				outputValue.setText(answer); 
			}
		});
		
		subtract.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent arg0) {
				if(input1.getText().equals("Enter a number") || input2.getText().equals("Enter a number")) {
					outputValue.setText("ERROR: Input is empty/invalid");
					return;
				}
				String num1 = input1.getText();
				String num2 = input2.getText();
				double value1 = Double.parseDouble(num1);
				double value2 = Double.parseDouble(num2);
				double subtract = value1 - value2;
				String answer = String.valueOf(subtract);
				outputValue.setText(answer);
			}
		});
		
		multiply.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent arg0) {
				if(input1.getText().equals("Enter a number") || input2.getText().equals("Enter a number")) {
					outputValue.setText("ERROR: Input is empty/invalid");
					return;
				}
				String num1 = input1.getText();
				String num2 = input2.getText();
				double value1 = Double.parseDouble(num1);
				double value2 = Double.parseDouble(num2);
				double multiply = value1 * value2;
				String answer = String.valueOf(multiply);
				outputValue.setText(answer);
			}
		});
		
		divide.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent arg0) {
				if(input1.getText().equals("Enter a number") || input2.getText().equals("Enter a number")) {
					outputValue.setText("ERROR: Input is empty/invalid");
					return;
				}
				String num1 = input1.getText();
				String num2 = input2.getText();
				double value1 = Double.parseDouble(num1);
				double value2 = Double.parseDouble(num2);
				double divide = value1 / value2;
				String answer = String.valueOf(divide);
				outputValue.setText(answer);
			}
		});
			
		
		F1Copy.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent arg0) {
				String num = outputValue.getText();
				input1.setText(num);				
			}
		});
		
		F2Copy.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent arg0) {
				String num = outputValue.getText();
				input2.setText(num);				
			}
		});
		
		quit.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent arg0) {
				System.exit(0);
			}
		});

		GridLayout gridLayout = new GridLayout(0, 1);
		this.setLayout(gridLayout);
				
		JPanel F1Panel = new JPanel();
		F1Panel.add(F1);
		F1Panel.add(input1);
		F1Panel.setBackground(Color.lightGray);
		this.add(F1Panel);

		JPanel F2Panel = new JPanel();
		F2Panel.add(F2);
		F2Panel.add(input2);
		F2Panel.setBackground(Color.lightGray);
		this.add(F2Panel);
		
		JPanel outputPanel = new JPanel();
		outputPanel.add(output);
		outputPanel.add(outputValue);
		outputPanel.setBackground(Color.lightGray);
		this.add(outputPanel);
		
		JPanel buttons1 = new JPanel();
		buttons1.add(add);
		buttons1.add(subtract);
		add.setBackground(Color.pink);
		subtract.setBackground(Color.pink);
		buttons1.setBackground(Color.lightGray);
		this.add(buttons1);
		
		JPanel buttons2 = new JPanel();
		buttons2.add(multiply);
		buttons2.add(divide);
		multiply.setBackground(Color.pink);
		divide.setBackground(Color.pink);
		buttons2.setBackground(Color.lightGray);
		this.add(buttons2);
		
		JPanel copyButtons = new JPanel();
		copyButtons.add(F1Copy);
		copyButtons.add(F2Copy);
		F1Copy.setBackground(Color.cyan);
		F2Copy.setBackground(Color.cyan);
		copyButtons.setBackground(Color.lightGray);
		this.add(copyButtons);
		
		JPanel quitButton = new JPanel();
		quitButton.add(quit);
		quit.setBackground(Color.orange);
		quitButton.setBackground(Color.lightGray);
		this.add(quitButton);
	
		input1.selectAll();
		input2.selectAll();
		
		this.setVisible(true);
		this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

	}
	
	
	
	public static void main(String[] args) {
		Calculator frame = new Calculator();
		
	}
	
		
}
