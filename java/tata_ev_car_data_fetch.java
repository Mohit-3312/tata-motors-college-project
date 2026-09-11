

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
@WebServlet("/tata_ev_car_data_fetch")
public class tata_ev_car_data_fetch extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public tata_ev_car_data_fetch() {
        super();
    }
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
        response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
		
		PrintWriter out = response.getWriter();
		
		try {
			Connection con = null;
			Class.forName("com.mysql.cj.jdbc.Driver");
			con = DriverManager.getConnection("jdbc:mysql://127.0.0.1:3306/tatadb?useSSL=false&allowPublicKeyRetrieval=true","root","");
			String query = "select * from ev_car_details";
			
			Statement st = con.createStatement();
			ResultSet rs = st.executeQuery(query);
			
			List<Map<String,Object>> cars = new ArrayList<>();
			
			while(rs.next()) {
				Map<String, Object> row = new HashMap<>();
				
				row.put("id", rs.getInt("id"));
				row.put("name", rs.getString("name"));
				row.put("tagline", rs.getString("tagline"));
				row.put("price", rs.getDouble("price"));
				row.put("claimedrange", rs.getInt("claimedrange"));
				row.put("batterycapacity", rs.getInt("batterycapacity"));
				row.put("fastchargertime", rs.getInt("fastchargertime"));
				row.put("imageurl", rs.getString("imageurl"));
				row.put("warranty", rs.getInt("warranty"));
				
				cars.add(row);
			}
			
			Gson gson = new Gson();
			
			String json = gson.toJson(cars);
			out.println(json);
		}
		catch(Error | ClassNotFoundException | SQLException e) {
			out.println(e);
		}
		
		
		
		
		out.close();
		
		
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
