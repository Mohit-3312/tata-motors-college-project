import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.lang.reflect.Type;
import java.sql.*;
import java.util.HashMap;
import java.util.Map;

@WebServlet("/service_data_store")
public class service_data_store extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public service_data_store() {
        super();
    }

	protected void doOptions(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
		response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
		response.setHeader("Access-Control-Allow-Headers", "Content-Type");
		response.setStatus(HttpServletResponse.SC_OK);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
		response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
		response.setHeader("Access-Control-Allow-Headers", "Content-Type");
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		
		PrintWriter out = response.getWriter();
		Gson gson = new Gson();
		Map<String, Object> responseMap = new HashMap<>();

		try {
			// Read JSON sent from React
			StringBuilder sb = new StringBuilder();
			String line;
			BufferedReader reader = request.getReader();
			while ((line = reader.readLine()) != null) {
				sb.append(line);
			}

			// Parse JSON into Map
			Type type = new TypeToken<Map<String, String>>(){}.getType();
			Map<String, String> data = gson.fromJson(sb.toString(), type);

			String customerName = data.get("customerName");
			String phone = data.get("phone");
			String carModel = data.get("carModel");
			String serviceType = data.get("serviceType");
			String preferredDate = data.get("preferredDate");
			String notes = data.get("notes");

			// Database Connection & Insert
			Connection con = null;
			Class.forName("com.mysql.cj.jdbc.Driver");
			con = DriverManager.getConnection("jdbc:mysql://127.0.0.1:3306/tatadb?useSSL=false&allowPublicKeyRetrieval=true", "root", "");

			String query = "INSERT INTO service_bookings (customer_name, phone, car_model, service_type, preferred_date, notes) VALUES (?, ?, ?, ?, ?, ?)";
			PreparedStatement ps = con.prepareStatement(query);
			
			ps.setString(1, customerName);
			ps.setString(2, phone);
			ps.setString(3, carModel);
			ps.setString(4, serviceType);
			ps.setString(5, preferredDate);
			ps.setString(6, notes);

			int result = ps.executeUpdate();

			if (result > 0) {
				responseMap.put("status", "success");
				responseMap.put("message", "Service appointment booked successfully");
			} else {
				responseMap.put("status", "error");
				responseMap.put("message", "Failed to book appointment");
			}

			String json = gson.toJson(responseMap);
			out.println(json);

			ps.close();
			con.close();
		} 
		catch (Error | ClassNotFoundException | SQLException e) {
			responseMap.put("status", "error");
			responseMap.put("message", e.getMessage());
			out.println(gson.toJson(responseMap));
		}

		out.close();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}
}