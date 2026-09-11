

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


@WebServlet("/tata_cars_data_fetch")
public class tata_cars_data_fetch extends HttpServlet {
	private static final long serialVersionUID = 1L;
    
    public tata_cars_data_fetch() {
        super();
        // TODO Auto-generated constructor stub
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
			String query = "select * from cars_details";
			
			Statement st = con.createStatement();
			ResultSet rs = st.executeQuery(query);
			
			List<Map<String,Object>> cars = new ArrayList<>();

			
			while(rs.next())
			{
				Map<String, Object> row = new HashMap<>();

				// Extract data from ResultSet
				int id = rs.getInt("id");
				String name = rs.getString("name");
				String type = rs.getString("type");
				String tagline = rs.getString("tagline");
				double price = rs.getDouble("price");
				int rangeOrMileage = rs.getInt("rangeOrMileage");
				int safetyRating = rs.getInt("safetyRating");
				String fuelType = rs.getString("fuelType");
				String imageUrl = rs.getString("imageUrl");
				boolean popular = rs.getBoolean("popular");

				// Output the extracted data
				row.put("id", id);
				row.put("name", name);
				row.put("type", type);
				row.put("tagline", tagline);
				row.put("price", price);
				row.put("rangeOrMileage", rangeOrMileage);
				row.put("safetyRating", safetyRating);
				row.put("fuelType", fuelType);
				row.put("imageUrl", imageUrl);
				row.put("popular", popular);			
				
				cars.add(row);
			}
			
			Gson gson = new Gson();
			String json = gson.toJson(cars);
			
			out.println(json);
			
			rs.close();
			st.close();
			con.close();
				out.close();	
			
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
